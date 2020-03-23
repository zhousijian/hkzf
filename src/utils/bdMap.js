export const mapLocation = () => {
    return new Promise((resolve,reject) => {
        var geolocation = new window.BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() === window.BMAP_STATUS_SUCCESS) {
                // console.log(r);
                resolve({
                    name : r.address.city.replace('市',''),
                    point : r.point
                })
            }
            else {
                // 失败
                reject(r)
            }
        })
    })
}