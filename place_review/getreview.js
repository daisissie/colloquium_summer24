let map;
let centerCoordinates = { lat: 42.349134, lng: -71.083184 }; // Boston, MA
let infoWindow;
let contentString;

async function initMap() {
    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const { Place, Review } = await google.maps.importLibrary("places");

map = new Map(document.getElementById("map"), {
    center: centerCoordinates,
    zoom: 14,
    // ...
});

  // Use a place ID to create a new Place instance.
const place = new Place({
    id: "ChIJpyiwa4Zw44kRBQSGWKv4wgA", // Faneuil Hall Marketplace, Boston, MA
});

  // Call fetchFields, passing 'reviews' and other needed fields.
await place.fetchFields({
    fields: ["displayName", "formattedAddress", "location", "reviews"],
});
  // If there are any reviews display the first one.
if (place.reviews && place.reviews.length > 0) {
    // Get info for the first review.
    let reviewRating = place.reviews[0].rating;
    let reviewText = place.reviews[0].text;
    let authorName = place.reviews[0].authorAttribution.displayName;
    let authorUri = place.reviews[0].authorAttribution.uri;

    // Format the review using HTML.
    contentString = `
            <div id="title"><b>${place.displayName}</b></div>
            <div id="address">${place.formattedAddress}</div>
            <a href="${authorUri}" target="_blank">Author: ${authorName}</a>
            <div id="rating">Rating: ${reviewRating} stars</div>
            <div id="rating"><p>Review: ${reviewText}</p></div>`;
} else {
    contentString = "No reviews were found for " + place.displayName + ".";
}

  // Create an infowindow to display the review.
infoWindow = new InfoWindow({
    content: contentString,
    ariaLabel: place.displayName,
});

  // Add a marker.
const marker = new AdvancedMarkerElement({
    map,
    position: place.location,
    title: place.displayName,
});

  // Show the info window.
infoWindow.open({
    anchor: marker,
    map,
});
}

initMap();