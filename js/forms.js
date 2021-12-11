// general purpose form handler
const processForm = form => {

}

// return layer to be toggled
const toggleLayers = (form, map) => {

    form.onchange = e => {
     
        const layer = e.target.value
        const visibility = e.target.checked ? 'visible' : 'none'
        console.log(layer);
        if (layer === "retail"){
        // alert("Hello! I am an alert box!!");
        map.setLayoutProperty("retail", 'visibility', visibility)
        map.setLayoutProperty("retail2", 'visibility', visibility)
        }
        else if (layer === "transit"){
            map.setLayoutProperty("septa", 'visibility', visibility)
            map.setLayoutProperty("njt", 'visibility', visibility)
        }
        else if (layer === "sidewalks"){
            map.setLayoutProperty("sidewalks", 'visibility', visibility)
            map.setLayoutProperty("crosswalks", 'visibility', visibility)
        }
        else {
        map.setLayoutProperty(layer, 'visibility', visibility)
        }
    }
}

// return filter to be applied
const filterLayers = values => {
    // process data

    // create filter

    // return filter
}

export { toggleLayers, filterLayers}