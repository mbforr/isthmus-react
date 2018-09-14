# ⚡ Isthmus 

# Overview

Isthmus is a boilerplate application framework built for building Location Intelligence applications with CARTO and with React and Redux. It is built to incorporate core CARTO libraries such as CARTO.js and Airship, make common tasks such as adding layers and creating a map simple, and includes core technology for developing, bundling, and creating production versions of your application a simple process.

## Core Technology

Below is a short list of some of the core tech and libraries that are used in Isthmus:


- [CARTO.js](https://carto.com/developers/carto-js/)
- [Airship](https://carto-airship.netlify.com/)
- [Leaflet](https://leafletjs.com/)
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Babel](https://babeljs.io/)
- [Webpack](https://webpack.js.org/)
- [Express](https://expressjs.com/)
## Features

What does Isthmus do? Here are some of the great things you can do with Isthmus:


- Start a location intelligence application without adding multiple packages 
- Easily add layers to your map and maintain a global state for CARTO settings
- Simple and easy to use global application state with layers, map location, and other details
- Quick commands for development, production, and deployment
- All the tools you need to build location intelligence apps with CARTO in one location
# Documentation
## Getting Started

To get started, make sure you have Yarn installed on your computer. For installation instructions go [here](https://yarnpkg.com/en/docs/install#mac-stable).

First, clone the repo to your desired location:


    git clone https://github.com/mbforr/isthmus-react.git

Them move into the Isthmus folder:


    cd isthmus-react

To configure all the required packages simply run Yarn:


    yarn

This should install all the necessary packages and you should be ready to go!

## Starting Isthmus

To get Isthmus started and to begin developing your application you can run:


    yarn run dev

This will start a local server running at http://localhost:8080 (or another port if you have a server running at this port already). This will also open another window at http://localhost:9000 which is a Webpack Bundle Analyzer to see the size of the Webpack bundle and associated packages.

This will open your development environment and includes hot reloading, which will refresh the page after a change has been saved.

If you are new to using Yarn and creating a React based project you can check out tis

## Other Commands
- To run a simple build use `yarn run build`
- To run a complete production build with production minified .js files use `yarn run prod`
- To start a server to view build or production files use `yarn run start`

A complete production workflow would use `yarn run prod` and then `yarn run start` as the command for the server to start the application once it has been deployed.

*Coming soon* `*yarn run test*`

## Configuring Your Map

Once you have your development server up and running, you can set your global map and CARTO account settings for your application. Navigate to `../src/data/C.js` and  you will see the following settings:


    const C = {
        SQL_API_URL: 'https://username.carto.com/api/v2/sql?q=',
        BASEMAP: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png',
        BASEMAP_LABELS: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png',
        USERNAME: 'username',
        API_KEY: 'default_public',
        CENTER: [33.753707, -84.389363],
        ZOOM: 6
    };
    
    export default C

Simply change any of these variables to configure your map settings and they will be imported into the correct components to render your map properly. That’s it!

## Adding Layers

To add layers to your map navigate to `../src/data/layers/` and you will see two files:


- `railaccidents.js` - a sample layer configuration file
- `index.js` - the main configuration file for all layers

To add a layer you can either copy the `railaccidents.js` layer or modify that layer file. Keep in mind that the name of that file will be the name of the layer variable in the application state.


    export default {
      name: 'Rail Accidents',
      visible: true,
      cartocss: `
      #layer {
        marker-width: 7;
        marker-fill: ramp([equipment_damage], (#f3e79b, #fac484, #f8a07e, #eb7f86, #ce6693, #a059a0, #5c53a5), quantiles);
        marker-fill-opacity: 1;
        marker-allow-overlap: true;
        marker-line-width: 1;
        marker-line-color: #FFFFFF;
        marker-line-opacity: 1;
      }
      `,
      query: `
        SELECT * FROM rail_accidents
      `
      }
    };

The following elements must be added for your layer to show up:

| `name`     | Name of your layer                                |
| ---------- | ------------------------------------------------- |
| `visible`  | Boolean for the starting visibility of your layer |
| `cartocss` | CartoCSS for the styling of your layer            |
| `query`    | Starting PostGIS query for your layer             |

Once these are set you can save you layer and open the `index.js` file


    import railaccidents from './railaccidents';
    import states from './states';
    
    // Export order will be the layer order
    export default {
      states,
      railaccidents
    }

If I were to add a new layer called states, all I need to do is to import that new layer into the `index.js` file and then set the order of the layers. The bottom most layer will be on top, so in this example `railaccidents` will show up on top of the `states` layer. That’s it!

## Application State

Isthmus includes a central application state that is managed by Redux. You can see the [store](https://github.com/mbforr/isthmus-react/tree/master/src/store), [actions](https://github.com/mbforr/isthmus-react/tree/master/src/actions), and [reducers](https://github.com/mbforr/isthmus-react/tree/master/src/reducers) set in the linked files. Isthmus also includes the [redux-logger](https://www.npmjs.com/package/redux-logger) package so you can see the output of the application state in the console. Please note it is saved as a full dependency and you can choose to save it as a development dependency if you so desire.

The application state is as follows:

| **State Item** | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `boundingbox`  | Contains information for CARTO to use a Bounding Box filter in the data. See the [CARTO.js Docs here](https://carto.com/developers/carto-js/reference/#cartofilterboundingboxleaflet) for more information                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `client`       | Contains information for your `carto.Client` which is the entry point and authentication for your application. See more in the [CARTO.js docs here](https://carto.com/developers/carto-js/reference/#cartoclient)                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `layers`       | Contains information about your CARTO layers that have been added to the map in the `carto.layer.Layer` object. See this [CARTO.js documentation](https://carto.com/developers/carto-js/reference/#cartolayerlayer) for more information.

The layer object will inherit the name given in the index.js file. This will contain most of the information about modifying the layer, query, dataviews, and styles. For example in the example application:

`this.props.layers.railaccidents.source` will be used to modify the entire layer
`this.props.layers.railaccidents.style` contains styling information

Review the documentation for more information. |
| `map`          | Contains the Leaflet map object which stores all the map information. Please refer to the [Leaflet documentation here](https://leafletjs.com/reference-1.3.4.html#map-example)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `viewport`     | Contains information about the current viewport view, specifically:

`center`: Array contain the Latitude and Longitude of the center of the map
`zoom`: Current zoom level                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

You can use any of these state objects to modify the state of the application with dataviews, changing style, resetting queries, grabbing feature data to query from the SQL API, etc.

*Note that changing a widget or a data view currently will note manipulate the entire application state and that Isthmus currently relies on CARTO.js dataviews and filters to modify the map data being visualized. Please spend some time familiarizing yourself with* [*CARTO.js Dataviews*](https://carto.com/developers/carto-js/reference/#cartodataviewbase) *and* [*CARTO.js Filters*](https://carto.com/developers/carto-js/reference/#cartofilterand)*.*

## Widgets

There are several pre-build Widgets within Isthmus that can be used for manipulating data viewed within the map. Please review the roadmap for future additions and open an issue for other suggestions.

In the base example, widgets are rendered in the `RightBar.js` file however using Airship, they can be placed in any container.

**Category Widget**
Below is an example category widget:


    <Category
        heading='Railroad Company'
        description='Total damage for each railroad company in USD'
        categoryLayer={this.props.layers.railaccidents.source}
        column='railroad'
        operation={carto.operation.SUM}
        operationColumn='total_damage'
    />


| `heading`         | Widget heading title                                                                                                                                                                                                          |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `description`     | Widget description title                                                                                                                                                                                                      |
| `categoryLayer`   | Layer which the category widget will be created for. This will follow the format `this.props.layers.{LAYER_NAME}.source`                                                                                                      |
| `column`          | Column which the category widget will be created on                                                                                                                                                                           |
| `operation`       | [CARTO.js filter operation](https://carto.com/developers/carto-js/reference/#cartooperation) that will be applied to the [CARTO.js Category Dataview](https://carto.com/developers/carto-js/reference/#cartodataviewcategory) |
| `operationColumn` | Numeric column where the operation will be applied                                                                                                                                                                            |

**Histogram Widget (In Development)**
*TBD*

## Joining Filters

When you add multiple filter to the same source, CARTO.js will assume that they should be joined by the `AND` operator, so they will create a filter on both of those filters. 

## Other Controls

**Export**

To allow for exporting of your data you can add an Export button that allows you to export data for one layer. Data will export with filters if they have been applied.


    <Export
      layer={this.props.layers.railaccidents.source}
      format='shp'
      filename='rail_data'
      name='Export Data'
    />


| `layer`    | Layer which the export button will be created for. This will follow the format `this.props.layers.{LAYER_NAME}.source`                                                                                   |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `format`   | File format that will exported. Options include `gpkg`, `csv`, `shp`, `svg`, `kml`, `spatialite`, `geojson` - [see more here](https://carto.com/developers/sql-api/reference/#operation/getSQLStatement) |
| `filename` | Filename of the exported file                                                                                                                                                                            |
| `name`     | Title of the export button                                                                                                                                                                               |

## Adjusting Layout

Airship has multiple layout options that you can embed into a component like `RightBar.js`. Refer to the [Airship documentation here](https://carto-airship.netlify.com/catalog/#/layout) to learn more.

## Pages & Router

Isthmus also includes [react-router-dom](https://www.npmjs.com/package/react-router-dom) to create different pages in your application. The router is in `[AppRouter.js](https://github.com/mbforr/isthmus-react/blob/master/src/routers/AppRouter.js)`. To create a new page you can make a copy of `Page.js` and rename the file and designate a new page name in the router. For example, the default app router looks like this:


    import React from 'react';
    import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
    import Page from '../components/Page';
    import RightBar from '../components/RightBar'
    import NotFoundPage from '../components/NotFoundPage';
    import Menu from '../components/Menu';
    
    const AppRouter = () => (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={Page} exact={true} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
    
    export default AppRouter;

Let’s say you create a new page called `NewPage.js`, then the router will look like this:


    import React from 'react';
    import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
    import Page from '../components/Page';
    import NewPage from '../components/NewPage';
    import RightBar from '../components/RightBar'
    import NotFoundPage from '../components/NotFoundPage';
    import Menu from '../components/Menu';
    
    const AppRouter = () => (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={Page} exact={true} />
            <Route path="/newpage" component={NewPage} exact={true} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
    
    export default AppRouter;

Here is a [great article](https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf) on all the options within the react-router-dom package for you to get started with more advanced routing options.

## What Else?

We are working on adding more features and functionality into Isthmus, but if there is a specific package or feature you want to see, make sure to open an issue!

# Roadmap
- ESLint
- [BrowserList](https://github.com/browserslist/browserslist/blob/master/README.md)
- Jest/Enzyme Testing


- Export Button
- Layer Toggle (in Legend)
- Checkbox List
- **Address Search**
- **Infowindow**
- Results Table
- **Layout Options in Components**
- **Numeric Display (Formula)**
- Range Slider
- [Avatar](https://carto-airship.netlify.com/catalog/#/styles/avatar)
- *Line Chart - dependent on Airship*
- *Pie Chart- dependent on Airship*
# Contributions

Contributions are absolutely welcome! You can either open an issue or create a pull request. To open an issue, please use the following format:


    #Title
    
    ##Objectives
    How will this feature improve Isthmus? What will it do?
    
    ##Implimentaiton
    What is the proposed implimentation of this feature? What areas or components of Isthmus will it affect
    
    ##Core Tech
    What packages will it use? How will it interact with CARTO.js and Airship? Are you making use of key features in both libraries (i.e. dataviews/filter)
    
    ##Other Information
# Contributors
# Other Information/Resources
- [CARTO.js - Dataviews and Filters](https://carto.com/developers/carto-js/reference/)
- [Airship - UI Development](https://carto-airship.netlify.com/)

