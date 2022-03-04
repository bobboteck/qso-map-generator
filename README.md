# QSO Map generator

Actually work in progress, is an application to generate data file, HTML and Javascript, to include an interactive Map of QSO in an WEB page.

At this link [https://bobboteck.github.io/app/qso-map-generator/index.html](https://bobboteck.github.io/app/qso-map-generator/index.html), you can see a preview version of the Application, I update here the App every time I add a new feature.

![MAP](/resources/map.jpg)

But why I work on this project? In my old website I use a picture of map, where was reported my position and the position of the stations connected on a specific occasion, tipically SOTA activations.
Now in  new and more modern website, I think that a more interactive map is the best solution.
Based on this idea, and taking inspiration from others sites that use maps, I made first prototype that insert data in map from information stored in Javascript code.
This is not a good solution, use code to store data is bad idea, I need a component that can be reused easily in more page of my site, so I chose to use an exrernal JSON file to store the data.

You can see an example of the final result in this [page of my web site](https://bobboteck.github.io/sota/sota-monte-elefante/), where I wrote the data file manually.

![Example of use in the web page](/resources/example-in-web-page.jpg)

The purpose of this application is to facilitate the writing of the data file and to provide a preview tool before inserting everything into the website.

## Developing

Application was made with React, TypeScript and Bootstrap.

It uses data map from [Open Street Map](https://www.openstreetmap.org/copyright), the [Leaflet](https://leafletjs.com/) library to manage the map and [Stamen's](https://stamen.com/open-source/) open source tiles.
In this application the [React Leaflet](https://react-leaflet.js.org/) library is used, just to be able to use it with React.

Any suggestions or supports are welcome!

## Datafile structure

This is the latest version of data structure of JSON file.

```json
{
    "MapConfig":
    {
        "Latitude": 42.1039,
        "Longitude": 12.8667,
        "Zoom": 5
    },
    "QTH": 
    {
        "Latitude": 42.1039,
        "Longitude": 12.8667,
        "Locator": "JN62kc",
        "isPortable": true,
        "Location": "<b>Monte Pellecchia</b> 1368 m",
        "References": 
        [
            {
                "Code": "I/LZ-042",
                "Type": "SOTA"
            },
            {
                "Code": "I-0713",
                "Type": "POTA"
            }
        ]
    },
    "Equipment":
    {
        "Radios":
        [
            {
                "Brand": "Yaesu",
                "Model": "FT-817",
                "PowerSupply": "Lead acid 12V 7Ah"
            }
        ],
        "Antennas":
        [
            {
                "Brand": "Home made",
                "Model": "folded dipole",
                "Other": ""
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
            "QRB": 33,
            "Band": "6m",
            "Frequency": "50145",
            "Mode": "SSB",
            "RSTr": 59,
            "RSTs": 59,
            "TxPower": 0.5,
            "RxPower": 0,
            "UtcTime": "2022-02-13T10:43:00Z",
            "Note": ""
        }
    ]
}
```
