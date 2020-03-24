export const mapLocation = () => {
    return new Promise((resolve, reject) => {
        var geolocation = new window.BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() === window.BMAP_STATUS_SUCCESS) {
                // console.log(r);
                resolve({
                    name: r.address.city.replace('市', ''),
                    point: r.point
                })
            }
            else {
                // 失败
                reject(r)
            }
        })
    })
}

export const mapSwitchAddress = (actionCity) => {
    return new Promise((resolve, reject) => {
        // 创建地址解析器实例     
        var myGeo = new window.BMap.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野    
        myGeo.getPoint(actionCity, function (point) {
            if (point) {
                // console.log(point);
                resolve(point)
            } else {
                reject(point)
            }
        }, actionCity);
    })
}