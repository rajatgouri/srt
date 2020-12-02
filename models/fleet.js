const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fleetSchema = new Schema({
    truck: {
        primeMover: [
            {
                vno: {
                    type: String,
                    trim: true
                },
                vrc: {
                    type: String,
                    trim: true
                }
            }
        ],
        craneTruck: [
            {
                vno: {
                    type: String,
                    trim: true
                },
                vrc: {
                    type: String,
                    trim: true
                }
            }  
        ],
        tiltTray: [
            {
                vno: {
                    type: String,
                    trim: true
                },
                vrc: {
                    type: String,
                    trim: true
                }
            }  
        ],
        regidBeavertail: [
            {
                vno: {
                    type: String,
                    trim: true
                },
                vrc: {
                    type: String,
                    trim: true
                }
            }  
        ],
        regidFlattop: [
            {
                vno: {
                    type: String,
                    trim: true
                },
                vrc: {
                    type: String,
                    trim: true
                }
            }  
        ],
        regidPantech: [
            {
                vno: {
                    type: String,
                    trim: true
                },
                vrc: {
                    type: String,
                    trim: true
                }
            }  
        ],
        regidWithTailgator: [
            {
                vno: {
                    type: String,
                    trim: true
                },
                vrc: {
                    type: String,
                    trim: true
                }
            }  
        ],
        retriverTowTruck: [
            {
                vno: {
                    type: String,
                    trim: true
                },
                vrc: {
                    type: String,
                    trim: true
                }
            }  
        ]
    },
    trailer: {
        dropDeck: {
            type: Number,
            trim:true
        },
        flatTop: {
            type: Number,
            trim:true
        },
        curtainSlider: {
            type: Number,
            trim:true
        },
        deckWinder: {
            type: Number,
            trim:true
        },
        lowLoader: {
            type: Number,
            trim:true
        },
        carCarrier: {
            type: Number,
            trim:true
        },
        dolly: {
            type: Number,
            trim:true
        },
        refrigrated: {
            type: Number,
            trim:true
        },
        sideLoader: {
            type: Number,
            trim:true
        },
        skel: {
            type: Number,
            trim:true
        },
        megaTilt: {
            type: Number,
            trim:true
        },
        platform: {
            type: Number,
            trim:true
        },
        wakingFloor: {
            type: Number,
            trim:true
        },
        liveStock: {
            type: Number,
            trim:true
        },
        grainTrailer: {
            type: Number,
            trim:true
        },
        tipper: {
            type: Number,
            trim:true
        },
        extendable: {
            type: Number,
            trim:true
        },
        sideTipper: {
            type: Number,
            trim:true
        },
        tanker: {
            type: Number,
            trim:true
        },
        dogTrailer: {
            type: Number,
            trim:true
        },
        horseFloat: {
            type: Number,
            trim:true
        },
        logging: {
            type: Number,
            trim:true
        },
        poleJinker: {
            type: Number,
            trim:true
        },
        pigTrailer: {
            type: Number,
            trim:true   
        }
    },
    configrations: {
        bDouble: {
            type: Number,
            trim:true
        },
        roadTrain: {
            type: Number,
            trim:true
        }
    },
    other: {
        pilot: {
            type: Number,
            trim:true
        },
        hotshot: {
            type: Number,
            trim:true
        },
        ute: {
            type: Number,
            trim:true
        },
        depotFacilities: {
            type: Number,
            trim:true
        },
        bobtailOperator: {
            type: Number,
            trim:true
        },
        driveHire: {
            type: Number,
            trim:true
        },
        tradePlates: {
            type: Number,
            trim:true
        }
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
    {
        timestamps: true,
        versionKey: false
    })

module.exports = mongoose.model("Fleet", fleetSchema, 'fleets');
