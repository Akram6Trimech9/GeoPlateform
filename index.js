const Express = require("express");
const BodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const app = Express();
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.use(cors());
app.use(morgan('tiny'));
const uri = "mongodb://127.0.0.1:27017/geoproject"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.on('err', () => { console.log('connection failed') });
mongoose.connection.on('ok', () => { console.log('connection done') })
const TourneeRoute = require("./routes/tourneeRoute");
const AdminRoute = require("./routes/AdminRoute");
const ActivityRoute=require("./routes/ActivityRoute"); 
const CLientRoute=require('./routes/ClientRoute');
const RegionRoute=require('./routes/RegionRoute');
const CentreDRoute=require('./routes/CentreDistributionRoute');
const FacteurRoute=require('./routes/FacteurRoute'); 
const AdressRoute=require('./routes/AdresseRoute');
const centreGeoRoute=require('./routes/CentreGeoRoute')
const chefRoute=require('./routes/ChefRoute') ;
const PanierRoute=require('./routes/PanierRoute');
app.use('/uploads',Express.static('uploads'));
app.use('/panier',PanierRoute);
app.use("/centreGeo",centreGeoRoute)
app.use("/adress",AdressRoute);
app.use("/client",CLientRoute);
app.use("/tournee",TourneeRoute);  
app.use("/admin",AdminRoute);             
app.use("/region",RegionRoute)
app.use("/facteur",FacteurRoute)
app.use("/centre",CentreDRoute)
app.use("/chef",chefRoute)
app.use("/activity",ActivityRoute)
app.listen(3001, '0.0.0.0', () => {
    console.log("app is running on port " + 3000);
})
