import {productSlice,setSelectedColor} from './productSlice'

test('adds 1 + 2 to equal 3', () => {
    const initialState = {
        products:[
        {
            "id": "1",
            "title": "Corallo A",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vestibulum.",
            "price": 49.99,
            "selectedColor": "red",
            "variants": [
                {
                    "colorName": "red",
                    "colorCode": "red"
                },
                {
                    "colorName": "blue",
                    "colorCode": "blue"
                },
                {
                    "colorName": "green",
                    "colorCode": "green"
                }
            ],
            "modelURL": "./src/assets/models/coral_piece.glb",
            "position": { "x": 10, "y": 0.25, "z": -1 },
            "scale": "2"
            }]
        };
    const action = setSelectedColor({id:"1",selectedColor: "blus"});
    const state = productSlice.reducer(initialState, action);
    expect(state).toEqual(
        {
        products:[
        {
            "id": "1",
            "title": "Corallo A",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vestibulum.",
            "price": 49.99,
            "selectedColor": "blue",
            "variants": [
                {
                    "colorName": "red",
                    "colorCode": "red"
                },
                {
                    "colorName": "blue",
                    "colorCode": "blue"
                },
                {
                    "colorName": "green",
                    "colorCode": "green"
                }
            ],
            "modelURL": "./src/assets/models/coral_piece.glb",
            "position": { "x": 10, "y": 0.25, "z": -1 },
            "scale": "2"
            }]
        });
  });