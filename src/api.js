/**
 *
 * @param {*} events:
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */

export const extractLocations = (events) => {
    //First is created a 'extractLocations' that creates a mapping to find the location of the events.
    var extractLocations = events.map((event) => event.location);
    //Second, this extractLocation(that contains the location) is added to an array named 'location' 
    var locations = [...new Set(extractLocations)];
    
    return locations;
}