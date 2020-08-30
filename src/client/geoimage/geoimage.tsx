import React from "react";

/**
 * Image processing in react
 */

export class GeoImage extends React.Component {

    state = {
        grayscale: 0,
        convolute: 0
    }

    render() {
        return <div style={{ display: 'flex', flexDirection: 'row' }}>


            <div style={{ width: 400, background: 'rgba(0,0,0,0.1)', padding: 20 }}>

                <h1>Geo Image Processor</h1>
                <h4>by Rouan van der Ende</h4>
                <h6>version 1</h6>
                <br />
                <h4>Controls:</h4>

                <table>
                    <tbody>
                        <tr>
                            <td>Grayscale</td>
                            <td>
                                <input type="range" min="0" max="100"
                                    value={this.state.grayscale * 100}
                                    className="slider"
                                    id="myRange"
                                    onChange={e => {
                                        let grayscale = parseInt(e.target.value) / 100;
                                        console.log(grayscale)
                                        this.setState({ grayscale })
                                    }}
                                />
                            </td>
                            <td>
                                {this.state.grayscale}
                            </td>
                        </tr>

                        <tr>
                            <td>Convolute</td>
                            <td>
                                <input type="range" min="0" max="100"
                                    value={this.state.convolute * 100}
                                    className="slider"
                                    id="myRange"
                                    onChange={e => {
                                        let convolute = parseInt(e.target.value) / 100;
                                        console.log(convolute)
                                        this.setState({ convolute })
                                    }}
                                />
                            </td>
                            <td>
                                {this.state.convolute}
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

            <div>
                <CanvasGeo width={800} height={800}
                    grayscale={this.state.grayscale}
                    convolute={this.state.convolute}
                />
            </div>
        </div>
    }
}

function CanvasGeo(props: any) {
    const [locations, setLocations] = React.useState([])
    const canvasRef = React.useRef(null)
    const imageRef: any = React.useRef(null);

    React.useEffect(() => {


        imageRef.current.onload = () => {
            updateCanvas();
        }

        updateCanvas();
    })

    function updateCanvas() {

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, window.innerHeight, window.innerWidth)
        // locations.forEach(location => draw(ctx, location))

        ctx.drawImage(imageRef.current, 0, 0);
        let imgdata = ctx.getImageData(0, 0, 800, 800);
        let processed = grayscale(imgdata);
        let processed2 = convolute(processed, [
            -1, 0, 1,
            -2, 0, 2,
            -1, 0, 1])


        ctx.putImageData(processed2, 0, 0);

    }

    function grayscale(pixels: ImageData) {
        var d = pixels.data;
        for (var i = 0; i < d.length; i += 4) {
            var r = d[i];
            var g = d[i + 1];
            var b = d[i + 2];
            // CIE luminance for the RGB
            // The human eye is bad at seeing red and blue, so we de-emphasize them.
            var grayval = (r + g + b) / 3;
            d[i] = (d[i] * (1 - props.grayscale)) + (grayval * props.grayscale)
            d[i + 1] = (d[i + 1] * (1 - props.grayscale)) + (grayval * props.grayscale)
            d[i + 2] = (d[i + 2] * (1 - props.grayscale)) + (grayval * props.grayscale)

        }
        return pixels;
    };

    function convolute(pixels: ImageData, weights: any) {
        var side = Math.round(Math.sqrt(weights.length));
        var halfSide = Math.floor(side / 2);
        var src = pixels.data;
        var sw = 800;
        var sh = 800;
        // pad output by the convolution matrix
        var w = sw;
        var h = sh;


        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        var output = ctx.createImageData(w, h);

        var dst = output.data;
        // go through the destination image pixels
        // var alphaFac = opaque ? 1 : 0;
        for (var y = 0; y < h; y++) {
            for (var x = 0; x < w; x++) {
                var sy = y;
                var sx = x;
                var dstOff = (y * w + x) * 4;
                // calculate the weighed sum of the source image pixels that
                // fall under the convolution matrix
                var r = 0, g = 0, b = 0, a = 0;
                for (var cy = 0; cy < side; cy++) {
                    for (var cx = 0; cx < side; cx++) {
                        var scy = sy + cy - halfSide;
                        var scx = sx + cx - halfSide;
                        if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                            var srcOff = (scy * sw + scx) * 4;
                            var wt = weights[cy * side + cx];
                            r += src[srcOff] * wt;
                            g += src[srcOff + 1] * wt;
                            b += src[srcOff + 2] * wt;
                            a += src[srcOff + 3] * wt;
                        }
                    }
                }
                dst[dstOff] = r;
                dst[dstOff + 1] = g;
                dst[dstOff + 2] = b;
                // dst[dstOff + 3] = a + alphaFac * (255 - a);
            }
        }

        // fade
        let pixelinput = pixels;
        var d = pixelinput.data;
        for (var i = 0; i < d.length; i += 4) {
            d[i] = (d[i] * (1 - props.convolute)) + (dst[i] * props.convolute)
            d[i + 1] = (d[i + 1] * (1 - props.convolute)) + (dst[i + 1] * props.convolute)
            d[i + 2] = (d[i + 2] * (1 - props.convolute)) + (dst[i + 2] * props.convolute)

        }

        return pixelinput;
    };


    return (
        <>
            <img ref={imageRef}
                src='./AntarcticaRockSurface.jpg'
                className="hidden" style={{ display: 'none' }} />

            <canvas
                ref={canvasRef}
                width={window.innerWidth}
                height={window.innerHeight}
                {...props}
            />
        </>
    )
}