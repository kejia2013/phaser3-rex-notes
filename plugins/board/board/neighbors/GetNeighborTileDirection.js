import TileXYIsEqual from '../../utils/TileXYIsEqual.js';

var GetNeighborTileDirection = function (srcTileXY, neighborTileXY) {
    if ((srcTileXY === null) || (neighborTileXY === null)) {
        return null;
    }
    if (TileXYIsEqual(srcTileXY, neighborTileXY)) {
        return null;
    }
    var direction = this.grid.getNeighborTileDirection(srcTileXY, neighborTileXY);
    if (this.wrapMode && (direction === null)) {
        globNeighborTileXYArray = this.getNeighborTileXY(srcTileXY, null, globNeighborTileXYArray);
        for (var i = 0, cnt = globNeighborTileXYArray.length; i < cnt; i++) {
            if (TileXYIsEqual(neighborTileXY, globNeighborTileXYArray[i])) {
                direction = i;
                break;
            }
        }
        globNeighborTileXYArray.length = 0;
    }
    return direction;
}

var globNeighborTileXYArray = [];

export default GetNeighborTileDirection;