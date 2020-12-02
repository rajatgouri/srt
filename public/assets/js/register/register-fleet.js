    
    // Trailer 
    const dropDeck = $('#drop_deck');
    const flatTop = $('#flat_top');
    const curtainSlider = $('#curtain_sider');
    const deckWinder = $('#deck_widner');
    const lowLoader = $('#low_loader');
    const carCarrier = $('#car_carrier');
    const dolly = $('#dolly');
    const refrigrated = $('#refrigerated');
    const sideLoader = $('#side_loader');
    const skel = $('#skel');
    const megaTilt = $('#mega_tilt');
    const platform = $('#platform');
    const wakingFloor = $('#walking_floor');
    const liveStock = $('#live_stock');
    const grainTrailer = $('#grain_trailer');
    const tipper = $('#tipper');
    const extendable = $('#extendable');
    const sideTipper = $('#side_tipper');
    const tanker = $('#tanker');
    const dogTrailer = $('#dog_trailer');
    const horseFloat = $('#horse_float');
    const logging = $('#logging');
    const poleJinker = $('#pole_jinker');
    const pigTrailer = $('#pig_trailer');

    // Configrations 
    const bDouble = $('#b_double');
    const roadTrain = $('#road_train');

    // Other
    const pilot = $('#pilot');
    const hotshot = $('#hotshot');
    const ute = $('#ute');
    const depotFacilities = $('#depot_facilities');
    const bobtailOperator = $('#bobtail_operator');
    const driveHire = $('#drive_hire');
    const tradePlates = $('#trade_plates');

    
   
    
    $('#carrier-fleet-form').on('submit', function(e) {
        e.preventDefault();
        let empty = true;
        $('#carrier-fleet-form input').each(function () {
            if ($(this).val() !== '') {
                empty = false;
            }
        });

        if (empty) {
            return alert('Please Select Atleast One Truck')
        }

    
        let primeMoverData = [];
        let craneTruckData = [];
        let tiltTrayData = [];
        let regidBeavertailData = [];
        let regidFlatTopData = [];
        let rigidPantechData = [];
        let rigidWithTailgatorData = [];
        let retrevierTowTruckData = [];
        let totalData = [];

        let prime_mover_vehicle_no = ($('.prime_mover_vehicle_no'));
        let prime_mover_vehicle_rc = ($('.prime_mover_vehicle_rc'));
        
        let crane_truck_vehicle_no = ($('.crane_truck_vehicle_no'));
        let crane_truck_vehicle_rc = ($('.crane_truck_vehicle_rc'));

        let tilt_tray_vehicle_no = ($('.tilt_tray_vehicle_no'));
        let tilt_tray_vehicle_rc = ($('.tilt_tray_vehicle_rc'));
        
        let regid_beavertail_vehicle_no = ($('.regid-beavertail_vehicle_no'));
        let regid_beavertail_vehicle_rc = ($('.regid-beavertail_vehicle_rc'));

        let rigid_flat_top_vehicle_no = ($('.rigid_flat_top_vehicle_no'))
        let rigid_flat_top_vehicle_rc = ($('.rigid_flat_top_vehicle_rc'))
 
        let rigid_pantech_vehicle_no = ($('.rigid_pantech_vehicle_no'))
        let rigid_pantech_vehicle_rc = ($('.rigid_pantech_vehicle_rc'))

        let rigid_with_tailgator_vehicle_no = ($('.rigid_with_tailgator_vehicle_no'))
        let rigid_with_tailgator_vehicle_rc = ($('.rigid_with_tailgator_vehicle_rc'))

        let retrevier_tow_truck_vehicle_no = ($('.retrevier_tow_truck_vehicle_no'))
        let retrevier_tow_truck_vehicle_rc = ($('.retrevier_tow_truck_vehicle_rc'))

        let isValid = false;

        if(prime_mover_vehicle_no.length !== prime_mover_vehicle_rc.length) {
            return alert('Something went Wrong!');
        }

        if(crane_truck_vehicle_no.length !== crane_truck_vehicle_rc.length) {
            return alert('Something went Wrong!');
        }


        if(tilt_tray_vehicle_no.length !== tilt_tray_vehicle_rc.length) {
            return alert('Something went Wrong!');
        }


        if(regid_beavertail_vehicle_no.length !== regid_beavertail_vehicle_rc.length) {
            return alert('Something went Wrong!');
        }


        if(rigid_flat_top_vehicle_no.length !== rigid_flat_top_vehicle_rc.length) {
            return alert('Something went Wrong!');
        }


        if(rigid_pantech_vehicle_no.length !== rigid_pantech_vehicle_rc.length) {
            return alert('Something went Wrong!');
        }

        if(rigid_with_tailgator_vehicle_no.length !== rigid_with_tailgator_vehicle_rc.length) {
            return alert('Something went Wrong!');
        }

        if(retrevier_tow_truck_vehicle_no.length !== retrevier_tow_truck_vehicle_rc.length) {
            return alert('Something went Wrong!');
        }


        for (let i=0;i<prime_mover_vehicle_no.length ;i ++) {
            let data = {
                "vno": prime_mover_vehicle_no[i].value.trim(),
                "vrc": prime_mover_vehicle_rc[i].value.trim()
            }

            primeMoverData.push(data)
        }

        for (let i=0;i<crane_truck_vehicle_no.length ;i ++) {
            let data = {
                "vno": crane_truck_vehicle_no[i].value.trim(),
                "vrc": crane_truck_vehicle_rc[i].value.trim()
            }

            craneTruckData.push(data)
        }

        for (let i=0;i<tilt_tray_vehicle_no.length ;i ++) {
            let data = {
                "vno": tilt_tray_vehicle_no[i].value.trim(),
                "vrc": tilt_tray_vehicle_rc[i].value.trim()
            }

            tiltTrayData.push(data)
        }
        

        for (let i=0;i<regid_beavertail_vehicle_no.length ;i ++) {
            let data = {
                "vno": regid_beavertail_vehicle_no[i].value.trim(),
                "vrc": regid_beavertail_vehicle_rc[i].value.trim()
            }

            regidBeavertailData.push(data)
        }

        for (let i=0;i<rigid_flat_top_vehicle_no.length ;i ++) {
            let data = {
                "vno": rigid_flat_top_vehicle_no[i].value.trim(),
                "vrc": rigid_flat_top_vehicle_rc[i].value.trim()
            }

            regidFlatTopData.push(data)
        }
        
        for (let i=0;i<rigid_pantech_vehicle_no.length ;i ++) {
            let data = {
                "vno": rigid_pantech_vehicle_no[i].value.trim(),
                "vrc": rigid_pantech_vehicle_rc[i].value.trim()
            }

            rigidPantechData.push(data)
        }
        
        for (let i=0;i<rigid_with_tailgator_vehicle_no.length ;i ++) {
            let data = {
                "vno": rigid_with_tailgator_vehicle_no[i].value.trim(),
                "vrc": rigid_with_tailgator_vehicle_rc[i].value.trim()
            }

            rigidWithTailgatorData.push(data)
        }
        
        for (let i=0;i<retrevier_tow_truck_vehicle_no.length ;i ++) {
            let data = {
                "vno": retrevier_tow_truck_vehicle_no[i].value.trim(),
                "vrc": retrevier_tow_truck_vehicle_rc[i].value.trim()
            }

            retrevierTowTruckData.push(data)
        }

      
        totalData.push(...primeMoverData, ...craneTruckData, ...tiltTrayData, ...regidBeavertailData, ...regidFlatTopData, ...rigidPantechData, ...rigidWithTailgatorData, ...retrevierTowTruckData);
        
        const unique = new Set();
        const idDuplicatesPresent = totalData.some(element => (unique.size === unique.add(element.vno).size) || (unique.size === unique.add(element.vrc).size));
        
        if(idDuplicatesPresent === true) {
            return alert('Please Remove Duplicates Values')
        } 



        

        var fleetData = {
            userId: userId,
            primeMover: primeMoverData,
            craneTruck: craneTruckData,
            tiltTray: tiltTrayData,
            regidBeavertail: regidBeavertailData,
            regidFlattop: regidFlatTopData,
            regidPantech: rigidPantechData,
            regidWithTailgator: rigidWithTailgatorData,
            retriverTowTruck: retrevierTowTruckData,
            dropDeck: dropDeck.val(),
            flatTop: flatTop.val(),
            curtainSlider: curtainSlider.val(),
            deckWinder: deckWinder.val(),
            lowLoader: lowLoader.val(),
            carCarrier: carCarrier.val(),
            dolly: dolly.val(),
            refrigrated: refrigrated.val(),
            sideLoader: sideLoader.val(),
            skel: skel.val(),
            megaTilt: megaTilt.val(),
            platform: platform.val(),
            wakingFloor: wakingFloor.val(),
            liveStock: liveStock.val(),
            grainTrailer: grainTrailer.val(),
            tipper: tipper.val(),
            extendable: extendable.val(),
            sideTipper: sideTipper.val(),
            tanker: tanker.val(),
            dogTrailer: dogTrailer.val(),
            horseFloat: horseFloat.val(),
            logging: logging.val(),
            poleJinker: poleJinker.val(),
            pigTrailer: pigTrailer.val(),
            bDouble: bDouble.val(),
            roadTrain: roadTrain.val(),
            pilot: pilot.val(),
            hotshot: hotshot.val(),
            ute: ute.val(),
            depotFacilities: depotFacilities.val(),
            bobtailOperator: bobtailOperator.val(),
            driveHire: driveHire.val(),
            tradePlates: tradePlates.val()

        }

        
        $('.fleet-button').attr('disabled', true);
        $('.fleet-button').text('Loading ...');

        Controller.carrierFleet({
            'data':  JSON.stringify(fleetData)
        })
    })