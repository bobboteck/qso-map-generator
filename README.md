# QSO Map generator

Actually work in progress, is an application to generate data file, html and Javascript, to include a Map of QSO in an HTML page.

In my old website i use a picture of map, where was reported my position and the position of the stations connected on a specific occasion, tipically SOTA activations.
Now in a modern website, I think that a more interactive map is the best solution.
Based on this idea, and taking inspiration from others sites that use maps, I made first prototype that insert data in map from information stored in Javascript code.
This is not a good solution, use code to store data is bad idea, I need a component that can be reused easily in more page of my site, so I chose to use an exrernal JSON file to store the data.

You can see an example in this [page of my web site](https://bobboteck.github.io/sota/sota-monte-elefante/), where I wrote the data file manually.

The purpose of this application is to facilitate the writing of the data file and to provide a prewiev tool before inserting everything into your website.

## Developing

Application was made with React, TypeScript and Bootstrap.

It uses data map from [Open Street Map](https://www.openstreetmap.org/copyright), the [Leaflet](https://leafletjs.com/) library to manage the map and [Stamen's](https://stamen.com/open-source/) open source tiles.

Any suggestions or supports are welcome!

## Datafile structure

This is the latest version of data structure of JSON file.

```json
{
    "MapConfig":
    {
        "Latitude": 42.479,
        "Longitude": 12.958,
        "Zoom": 5
    },
    "MyQTH": 
    {
        "Latitude": 42.479,
        "Longitude": 12.958,
        "isPortable": true,
        "Location": "<b>Monte Elefante</b> 2015 m",
        "Locator": "JN62ll",
        "References": 
        [
            {
                "Reference" : ""
            }
        ]
    },
    "QSOs":
    [
		{
            "Call": "IU0PHY",
            "Latitude": 41.938,
            "Longitude": 12.542,
            "Locator": "JN61gw",
            "QRB": 0,
            "Band": "6m",
            "Frequency": "",
            "Mode": "SSB",
            "RSTr": 59,
            "RSTs": 59,
            "TxPower": 0.5,
            "RxPower": 0,
            "UtcTime": "2007-05-20",
            "Note": ""
        }
    ]
}
```
