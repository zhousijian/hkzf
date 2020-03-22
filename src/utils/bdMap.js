export const mapLocation = () => {
    return new Promise((resolve) => {
        const myCity = new window.BMap.LocalCity();
        myCity.get(function (result) {
            resolve(result);            
        });
        })
    }