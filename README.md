# leaflet-challenge

## Tasks:
### Choose and load data
To begin this project, I utilized the USGS GeoJSON Feed page to obtain a URL with a JSON file containing data for all earthquakes that occured in the past 7 days. I then used d3 to read in the JSON file in order to use the data.
### Visualize Data
After reading in the data, my program creates a map (using a base map from openstreetmap.org) and layers it with markers for each of earthquakes recorded in the API. The markers' characteristics are based on the data point for each such that the size indicates the magnitude of the earthquake and the color indicates the density. Upon clicking on each marker, the viewer will be able to see where the earthquake occured, the magnitude of the earthquake, and the density of teh earthquake.
