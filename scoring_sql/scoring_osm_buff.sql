/*Access Score station-based geoprocessing sql script.  All data obtained from Cpollard, and loaded into a postgresql/postgis db*/
--civic count
with civiccount as (
    select
        count(rca.objectid) as civic_cnt,
        dvrpc_id
    from
        rs_osm_buffer_new ra,
        rs_civic_attr_2021 rca
    where
        st_intersects(ra.shape, rca.shape)
    group by
        dvrpc_id
),
--civic quantile scoring
civicscore as (
	select
		dvrpc_id, 1+(rank() over (order by civic_cnt)-1) * 5 / count(1) over (partition by (select 1)) as civic_score
    from 
        civiccount
),
--park scoring
parkdistance as (
    select
        dvrpc_id,
        st_distance(ra.shape, rpo.shape) as parkdis
    from
        rs_accessscorestations_new ra,
        rs_dvrpc_parks_and_openspace_2016 rpo
),
parkselect as (
    select
        dvrpc_id,
        case
            when parkdis <= 402.336 then 5
            when parkdis > 402.336
            and parkdis <= 804.672 then 4
            when parkdis > 804.672
            and parkdis <= 1609.344 then 3
            when parkdis > 1609.344
            and parkdis <= 3218.688 then 2
            else 1
        end as park_score
    from
        parkdistance
),
parkfinal as (
    select
        dvrpc_id,
        max(park_score) as park_score
    from
        parkselect
    group by
        dvrpc_id
),
--retail scoring
retaildistance as (
    select
        dvrpc_id,
        st_distance(ra.shape, st_transform(rrd.shape, 26918)) as retaildis
    from
        rs_accessscorestations_new ra,
        rs_retail rrd
),
retailselect as (
    select
        dvrpc_id,
        case
            when retaildis <= 402.336 then 5
            when retaildis > 402.336
            and retaildis <= 804.672 then 4
            when retaildis > 804.672
            and retaildis <= 1609.344 then 3
            when retaildis > 1609.344
            and retaildis <= 3218.688 then 2
            else 1
        end as retail_score
    from
        retaildistance
),
retailfinal as (
    select
        dvrpc_id,
        max(retail_score) as retail_score
    from
        retailselect
    group by
        dvrpc_id
),
--eta count 2 mile
etacount as (
    select
        count(rees.objectid) as eta_cnt,
        dvrpc_id
    from
        rs_osm_buffer_new ra,
        rs_eta_essential_services rees
    where
        st_intersects(ra.shape, rees.shape)
    group by
        dvrpc_id
),
--eta quantile scoring
etascore as (
	select
		dvrpc_id, 1+(rank() over (order by eta_cnt)-1) * 5 / count(1) over (partition by (select 1)) as eta_score 
    from 
        etacount
),
--employee sum 2 mile
employeecount as (
    select
        sum(rn.emp15) as emp_sum,
        dvrpc_id
    from
        rs_osm_buffer_new ra,
        rs_nets_2015 rn
    where
        st_intersects(ra.shape, rn.shape)
    group by
        dvrpc_id
),
--employee quantile scoring
employeescore as (
	select
		dvrpc_id, 1+(rank() over (order by emp_sum)-1) * 5 / count(1) over (partition by (select 1)) as employee_score 
    from
        employeecount
),
--ipd scoring
ipdselect as (
    select
        dvrpc_id,
        ri.d_class as category
    from
        rs_osm_buffer_new ra,
        rs_ipd_2019 ri
    where
        st_intersects(ra.shape, ri.shape)
),
ipdselectscore as (
    select
        dvrpc_id,
        case
            when category = 'Well Below Average' then 1
            when category = 'Below Average' then 2
            when category = 'Average' then 3
            when category = 'Above Average' then 4
            when category = 'Well Above Average' then 5
            else null
        end as ipd_score
    from
        ipdselect
),
ipdfinal as (
    select
        dvrpc_id,
        max(ipd_score) as ipd_score --selects max IPD value in the 1 mile selection
    from
        ipdselectscore
    group by
        dvrpc_id
),
--zero car sum 2 mile
zerocarcount as (
    select
        sum(zc.zerocarhh) as zerocar_sum,
        dvrpc_id
    from
        rs_osm_buffer_new ra,
        rs_asc_tract_zerocarhh zc
    where
        st_intersects(ra.shape, st_transform(zc.shape, 26918))
    group by
        dvrpc_id
),
--zero car quantile scoring
zerocarscore as (
	select
		dvrpc_id,
        1+(rank() over (order by zerocar_sum)-1) * 5 / count(1) over (partition by (select 1)) as zerocar_score 
    from 
        zerocarcount
),
--total population sum 2 mile
popcount as (
    select
        sum(rp.u_tpopest) as pop_sum,
        dvrpc_id
    from
        rs_osm_buffer_new ra,
        rs_populationdensity rp
    where
        st_intersects(ra.shape, rp.shape) 
        and rp.u_tpopest > 0
    group by
        dvrpc_id
),
--population quantile scoring
popscore as (
	select
		dvrpc_id, 
        1+(rank() over (order by pop_sum)-1) * 5 / count(1) over (partition by (select 1)) as pop_score 
    from 
        popcount
),
--find max survey year by station id
maxtable as (
    select 
        dvrpc_id,
        max(cast(surveyyear as numeric)) as year 
    from 
        rs_surveys 
    group by 
        dvrpc_id
),
--total surveys per station id
totalsurv as (
    select 
        rs.dvrpc_id,
        count(rs.shape) as tot_surv_count
    from 
        rs_surveys rs
    left join maxtable on rs.dvrpc_id=maxtable.dvrpc_id
    group by 
        rs.dvrpc_id
),
--count survey 2 miles of access station with same station id
selectsurv as (
    select
        ra.dvrpc_id,
        count(rs2.shape) as surv_count
    from
        rs_osm_buffer_new ra,
        rs_surveys rs2
    where
        st_intersects(ra.shape, rs2.shape) 
        and ra.dvrpc_id::integer = rs2.dvrpc_id
        and ra.scoreset < 2
    group by
        ra.dvrpc_id
),
--survey count 2 miles/total survey count
survcalc as (
    select
        selectsurv.dvrpc_id,
        surv_count,
        tot_surv_count,
        cast(surv_count as float)/cast(tot_surv_count as float) as surv_calc
    from
        selectsurv
    full join totalsurv on totalsurv.dvrpc_id = selectsurv.dvrpc_id::integer
),
--survey quantile scoring of survey calculation
survscore as (
	select
		dvrpc_id, 
        1+(rank() over (order by surv_calc)-1) * 5 / count(1) over (partition by (select 1)) as surv_score 
    from 
        survcalc
),
--total crashes 2 mile
totcrash as (
    select
        count(rcdm.objectid) as crash_tot,
        dvrpc_id
    from
        rs_osm_buffer_new ra,
        rs_crash_data_2mi rcdm
    where
        st_intersects(ra.shape, st_transform(rcdm.shape, 26918))
    group by
        dvrpc_id
),
--ksi crashes 2 mile
ksicrash as (
    select
        dvrpc_id,
        count(rcdm.objectid) as ksi_tot
    from
        rs_osm_buffer_new ra,
        rs_crash_data_2mi rcdm
    where
        st_intersects(ra.shape, st_transform(rcdm.shape, 26918)) 
        and rcdm.max_severi IN (0,1)
    group by
        dvrpc_id
),
--total ksi crash quantile scoring
ksiscore as (
	select
		dvrpc_id, 1+(rank() over (order by ksi_tot)-1) * 5 / count(1) over (partition by (select 1)) as ksi_score 
    from 
        ksicrash
),
--ksi bike crashes 2 mile
ksibikecrash as (
    select
        count(rcdm.objectid) as ksi_bike_tot,
        dvrpc_id
    from
        rs_osm_buffer_new ra,
        rs_crash_data_2mi rcdm
    where
        st_intersects(ra.shape, st_transform(rcdm.shape, 26918))
        and rcdm.max_severi IN (0,1)
        and rcdm.bicyclists > 0
    group by
        dvrpc_id
),
--ksi ped crashes 2 mile
ksipedcrash as (
    select
        count(rcdm.objectid) as ksi_ped_tot,
        dvrpc_id
    from
        rs_osm_buffer_new ra,
        rs_crash_data_2mi rcdm
    where
        st_intersects(ra.shape, st_transform(rcdm.shape, 26918))
        and rcdm.max_severi IN (0,1)
        and rcdm.pedestrian > 0
    group by
        dvrpc_id
),
--circuit scoring
circuitdistance as (
    select
        dvrpc_id,
        st_distance(ra.shape, rc.shape) as circuitdis
    from
        rs_accessscorestations_new ra,
        rs_circuittrail rc
    where 
        rc.circuit in ('Existing','In Progress')
),
circuitselect as (
    select
        dvrpc_id,
        case
            when circuitdis <= 402.336 then 5
            when circuitdis > 402.336
            and circuitdis <= 804.672 then 4
            when circuitdis > 804.672
            and circuitdis <= 1609.344 then 3
            when circuitdis > 1609.344
            and circuitdis <= 3218.688 then 2
            else 1
        end as circuit_score
    from
        circuitdistance
),
circuitfinal as (
    select
        dvrpc_id,
        max(circuit_score) as circuit_score
    from
        circuitselect
    group by
        dvrpc_id
),
--intersection density sum legs/sq.acres 2 mile
interden as (
    select
        dvrpc_id,
        sum(ri.numlegs)/(st_area(st_buffer(ra.shape, 3218.688)) * 0.000247105) as inter_den
    from
        rs_osm_buffer_new ra,
        rs_intersections ri
    where
        st_intersects (ra.shape, ri.shape)
    group by
        dvrpc_id,
        ra.shape
),
--intersection density quantile scoring
interscore as (
	select
		dvrpc_id,
        1+(rank() over (order by inter_den)-1) * 5 / count(1) over (partition by (select 1)) as inter_score
    from 
        interden
),
--clip lts by matching station id and 2 mile buffer, sum lengths by station id
ltsclip as (
	select 
		lts.dvrpc_id,
		st_intersection(rs.shape,lts.shape) as geom
	from 
		rs_osm_buffer_new rs, 
		rs_lts_islands lts
	where 
		rs.dvrpc_id::integer = lts.dvrpc_id
),
lts_length as (
	select 
		sum(st_length(geom))*0.0006213712 as lts_miles, 
		dvrpc_id
	from 
		ltsclip
	group by 
		dvrpc_id
),
--lts quantile scoring
ltsscore as (
	select
		dvrpc_id, 
		lts_miles, 
		1+(rank() over (order by lts_miles)-1) * 5 / count(1) over (partition by (select 1)) as lts_score 
    from
        lts_length
),
--walkshed total sidewalk miles
walkshed_tot as (
	select
		sum(st_length(st_transform(rped.shape,26918)))*0.0006213712 as ped_miles,
		rw.dvrpc_id 	
	from 
		rs_osm_buffer_new rw,
		rs_pednetwork rped
	where 
        st_intersects(rw.shape, st_transform(rped.shape,26918)) 
        and rped.line_type = 1
	group by 
        rw.dvrpc_id
),
-- quantile score of walkshed sidewalk miles
pedscore as (
	select
		dvrpc_id, 
		ped_miles, 
		1+(rank() over (order by ped_miles)-1) * 5 / count(1) over (partition by (select 1)) as ped_score 
    from 
        walkshed_tot
)
--join all tables, rename fields
select
    ra.dvrpc_id, --station id
    civic_cnt as CIV_SM_A, --total number of civic resources within catchment area : NEEDS QUANTILE
    civic_score as CIV_SC_A, --civic resources quantile score
    park_score as POS_SC_A, --parks/open space < 1/4 mile (5), 1/4 to 1/2 mile (4), 1/2 to 1 mile (3), 1-2 miles (2), > 2miles (1) 
    retail_score as WRC_SC_A, --walkable retail < 1/4 mile (5), 1/4 to 1/2 mile (4), 1/2 to 1 mile (3), 1-2 miles (2), > 2miles (1) 
    eta_cnt as ESS_SM_A, --total number of eta services within catchment area : NEEDS QUANTILE
    eta_score as ESS_SC_A, --eta quantile score
    emp_sum as EMP_SM_A, --total employees (Nets 2015) within catchment area : NEEDS QUANTILE
    employee_score as EMP_SC_A, --employee count quantile score
    ipd_score as IPD_SC_A, --IPD within 1 mile (max value) --n/a (0), well below average (1), below average (2), average (3), abover average (4), well above average (5) 
    zerocar_sum as ZVH_SM_A, --Zero Vehicle Households (tract-level ASC 2019)  within catchment area : NEEDS QUANTILE
    zerocar_score as ZVH_SC_A, --Zero car quantile score
    pop_sum as POP_SM_A, --Total Population (tract-level ASC 2019) within catchment area : NEEDS QUANTILE
    pop_score as POP_SC_A, --Total population quantile score
    surv_count, --Count of most recent license plates within catchment area
    tot_surv_count, --Total count of most recent license plate survey for station
    surv_calc as LPS_VA_A, --2 mile license count/Total Count 
    surv_score as LPS_SC_A, --Survey calculation quantile score
    crash_tot, --Total 5 year crashes within catchment area
    ksi_tot as KSI_SM_A, --Total 5 year KSI crashes within catchment area
    ksi_score as KSI_SC_A, --Total 5 year KSI quantile score
    ksi_bike_tot, --Total 5 year KSI bike crashes within catchment area
    ksi_ped_tot, --Total 5 year KSI pedestrian crashes within catchment area
    circuit_score as CIR_SC_A, --On/Adjacent within 1/4 mile (5) , <=1/2 (4), 1/2 to 1 mile (3), 1-2 miles (2), > 2miles (1) 
    inter_den as INT_VA_A, --total number of legs from intesection layer that is within 1 mile of station divided by area(acres)
    inter_score as INT_SC_A, --intersection density quantile score
    lts_miles as LTS_VA_A, --miles of lts island in catchment area by station_id
    lts_score as LTS_SC_A, --lts quantile score
    ped_miles as PED_VA_A, --miles of ped network in catchment area by station_id
    ped_score as PED_SC_A --ped network quantile score
from
    rs_osm_buffer ra
    left join civiccount on civiccount.dvrpc_id = ra.dvrpc_id
    left join civicscore on civicscore.dvrpc_id = ra.dvrpc_id
    left join parkfinal on parkfinal.dvrpc_id = ra.dvrpc_id
    left join retailfinal on retailfinal.dvrpc_id = ra.dvrpc_id
    left join etacount on etacount.dvrpc_id = ra.dvrpc_id
    left join etascore on etascore.dvrpc_id = ra.dvrpc_id
    left join employeecount on employeecount.dvrpc_id = ra.dvrpc_id
    left join employeescore on employeescore.dvrpc_id = ra.dvrpc_id
    left join ipdfinal on ipdfinal.dvrpc_id = ra.dvrpc_id
    left join zerocarcount on zerocarcount.dvrpc_id = ra.dvrpc_id
    left join zerocarscore on zerocarscore.dvrpc_id = ra.dvrpc_id
    left join popcount on popcount.dvrpc_id = ra.dvrpc_id
    left join popscore on popscore.dvrpc_id = ra.dvrpc_id
    left join survcalc on survcalc.dvrpc_id = ra.dvrpc_id
    left join survscore on survscore.dvrpc_id = ra.dvrpc_id
    left join totcrash on totcrash.dvrpc_id = ra.dvrpc_id
    left join ksicrash on ksicrash.dvrpc_id = ra.dvrpc_id
    left join ksiscore on ksiscore.dvrpc_id = ra.dvrpc_id
    left join ksibikecrash on ksibikecrash.dvrpc_id = ra.dvrpc_id
    left join ksipedcrash on ksipedcrash.dvrpc_id = ra.dvrpc_id
    left join circuitfinal on circuitfinal.dvrpc_id = ra.dvrpc_id
    left join interden on interden.dvrpc_id = ra.dvrpc_id
    left join interscore on interscore.dvrpc_id = ra.dvrpc_id
    left join ltsscore on ltsscore.dvrpc_id = ra.dvrpc_id::integer
    left join pedscore on pedscore.dvrpc_id = ra.dvrpc_id
    order by dvrpc_id
    