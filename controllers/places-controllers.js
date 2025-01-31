const { v4: uuidv4 } = require('uuid');
const {validationResult} = require('express-validator');
const HttpError = require('../models/http-error');

let DUMMY_PLACES = [
  
    {
        id: 'p1',
        title: 'burj khalifa tower',
        description: 'most tallest building in the world',
        imageUrl:'https://media.arcadis.com/-/media/project/arcadiscom/com/projects/middle-east/united-arab-emirates/burj-khalifa-and-downtown-dubai/burj-khalifa-final1.png?rev=6ceaf725b6fc47d48e8ef3964d778a09',
        address:'Burj Khalifa Blvd - Downtown Dubai - Dubai - United Arab Emirates',
        location: {
                    lat:'25.1971328',
                    lng:'55.2717052'
                  },
        creator:'u1'
    
    },
    
    {
        id: 'p2',
        title: 'big ben',
        description: 'a clock tower in london',
        imageUrl:'https://lovetoeatandtravel.com/wp-content/uploads/2020/09/houses-of-parliament-1055056_1920.jpg',
        address:'London SW1A 0AA, United Kingdom',
        location: {
                    lat:'51.5007292',
                    lng:'-0.1246254'
                  },
        creator:'u2'
    
    },
    {
        id: 'p3',
        title: 'colosseum build',
        description: 'colosseum in rome',
        imageUrl:'https://a.travel-assets.com/findyours-php/viewfinder/images/res70/542000/542297-colosseum.jpg',
        address:'Piazza del Colosseo, 1, 00184 Roma RM, Italy',
        location: {
                    lat:'51.5007292',
                    lng:'-0.1246254'
                  },
        creator:'u3'
    
    }
    ];

    const getPlaceById = (req, res, next) => {
      const placeId = req.params.pid; // { pid: 'p1' }
    
      const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
      });
    
      if (!place) {
        throw new HttpError('Could not find a place for the provided id.', 404);
      }
    
      res.json({ place }); // => { place } => { place: place }
    };
    
    // function getPlaceById() { ... }
    // const getPlaceById = function() { ... }
    
    const getPlacesByUserId = (req, res, next) => {
      const userId = req.params.uid;
    
      const places = DUMMY_PLACES.filter(p => {
        return p.creator === userId;
      });
    
      if (!places || places.length === 0) {
        return next(
          new HttpError('Could not find places for the provided user id.', 404)
        );
      }
    
      res.json({ places });
    };
    
    const createPlace = (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()){
        console.log(errors);
        throw new HttpError ('invalid input passed, please check your data' , 422);
      };
      const { title, description, coordinates, address, creator } = req.body;
      // const title = req.body.title;
      const createdPlace = {
        id: uuid(),
        title,
        description,
        location: coordinates,
        address,
        creator
      };
    
      DUMMY_PLACES.push(createdPlace); //unshift(createdPlace)
    
      res.status(201).json({ place: createdPlace });
    };
    
    const updatePlace = (req, res, next) => {
      const { title, description } = req.body;
      const placeId = req.params.pid;
    
      const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) };
      const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
      updatedPlace.title = title;
      updatedPlace.description = description;
    
      DUMMY_PLACES[placeIndex] = updatedPlace;
    
      res.status(200).json({ place: updatedPlace });
    };
    
    const deletePlace = (req, res, next) => {
      const placeId = req.params.pid;
      DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
      res.status(200).json({ message: 'Deleted place.' });
    };
    
    exports.getPlaceById = getPlaceById;
    exports.getPlacesByUserId = getPlacesByUserId;
    exports.createPlace = createPlace;
    exports.updatePlace = updatePlace;
    exports.deletePlace = deletePlace;