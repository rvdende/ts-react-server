import React from "react";

/**
 * Image processing in react
 */

export class GeoImage extends React.Component {

    state = {
        grayscale: 0,
        convolute: 0
    }

    // ctx: CanvasRenderingContext2D;
    // imgdata: ImageData;

    // componentDidMount() {
    //     let canvasRef: any = this.refs.canvas;
    //     let canvas: HTMLCanvasElement = canvasRef
    //     this.ctx = canvas.getContext("2d")

    //     let imgRef: any = this.refs.image;
    //     const img: HTMLImageElement = imgRef;

    //     img.onload = () => {
    //         this.ctx.drawImage(img, 0, 0)
    //         this.imgdata = this.ctx.getImageData(0, 0, 800, 800);
    //         console.log(this.imgdata);
    //         this.ctx.font = '12px Verdana';
    //         this.ctx.fillStyle = "#cccccc";
    //         this.ctx.fillText('AntarcticaRockSurface.jpg', 10, 20);

    //         // let processed = this.grayscale(imgdata);
    //         // for (var a = 0; a < 500 * 500 * 4; a++) {
    //         //     imgdata.data[a] = Math.random() * 255
    //         // }
    //         let processed = this.grayscale(this.imgdata);
    //         this.ctx.putImageData(processed, 0, 0);


    //     }
    // }

    // componentDidUpdate = () => {
    //     console.log('update')
    //     this.updateCanvas();
    // }

    // updateCanvas = () => {
    //     if (!this.ctx) return;
    //     if (!this.imgdata) return;
    //     let processed = this.grayscale(this.imgdata);
    //     console.log('putting processed data', processed.data[2560000 / 2]);
    //     this.ctx.putImageData(processed, 0, 0);
    // }

    // grayscale = (pixels: ImageData) => {
    //     var d = pixels.data;
    //     for (var i = 0; i < d.length; i += 4) {
    //         var r = d[i];
    //         var g = d[i + 1];
    //         var b = d[i + 2];
    //         // CIE luminance for the RGB
    //         // The human eye is bad at seeing red and blue, so we de-emphasize them.
    //         var grayval = (r + g + b) / 3;
    //         d[i] = (d[i] * (1 - this.state.grayscale)) + (grayval * this.state.grayscale)
    //         d[i + 1] = (d[i + 1] * (1 - this.state.grayscale)) + (grayval * this.state.grayscale)
    //         d[i + 2] = (d[i + 2] * (1 - this.state.grayscale)) + (grayval * this.state.grayscale)

    //     }
    //     return pixels;
    // };

    render() {
        return <div>
            <h1>Geo Image Processor</h1>
            <h4>by Rouan van der Ende</h4>
            <h6>version 1</h6>

            <div>
                Controls:

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

const HOOK_SVG = 'm129.03125 63.3125c0-34.914062-28.941406-63.3125-64.519531-63.3125-35.574219 0-64.511719 28.398438-64.511719 63.3125 0 29.488281 20.671875 54.246094 48.511719 61.261719v162.898437c0 53.222656 44.222656 96.527344 98.585937 96.527344h10.316406c54.363282 0 98.585938-43.304688 98.585938-96.527344v-95.640625c0-7.070312-4.640625-13.304687-11.414062-15.328125-6.769532-2.015625-14.082032.625-17.960938 6.535156l-42.328125 64.425782c-4.847656 7.390625-2.800781 17.3125 4.582031 22.167968 7.386719 4.832032 17.304688 2.792969 22.160156-4.585937l12.960938-19.71875v42.144531c0 35.582032-29.863281 64.527344-66.585938 64.527344h-10.316406c-36.714844 0-66.585937-28.945312-66.585937-64.527344v-162.898437c27.847656-7.015625 48.519531-31.773438 48.519531-61.261719zm-97.03125 0c0-17.265625 14.585938-31.3125 32.511719-31.3125 17.929687 0 32.511719 14.046875 32.511719 31.3125 0 17.261719-14.582032 31.3125-32.511719 31.3125-17.925781 0-32.511719-14.050781-32.511719-31.3125zm0 0'

const HOOK_PATH = new Path2D(HOOK_SVG)
const SCALE = .2
const OFFSET = 80

function draw(ctx: any, location: any) {
    ctx.fillStyle = 'deepskyblue'
    ctx.shadowColor = 'dodgerblue'
    ctx.shadowBlur = 20
    ctx.save()
    ctx.scale(SCALE, SCALE)
    ctx.translate(location.x / SCALE - OFFSET, location.y / SCALE - OFFSET)
    ctx.fill(HOOK_PATH)
    ctx.restore()
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
            -1,
            0,
            1,
            -2,
            0,
            2,
            -1,
            0,
            1
        ], 1)


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

    function convolute(pixels: ImageData, weights: any, opaque: any) {
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
        var alphaFac = opaque ? 1 : 0;
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
                dst[dstOff + 3] = a + alphaFac * (255 - a);
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

    // function handleCanvasClick(e: any) {
    //     const newLocation = { x: e.clientX, y: e.clientY }
    //     setLocations([...locations, newLocation])
    // }

    // function handleClear() {
    //     setLocations([])
    // }
    // function handleUndo() {
    //     setLocations(locations.slice(0, -1))
    // }
    return (
        <>
            <img ref={imageRef}
                src='./AntarcticaRockSurface.jpg'
                className="hidden" style={{ display: 'none' }} />
            {/* <button onClick={handleClear}>Clear</button>
            <button onClick={handleUndo}>Undo</button> */}
            <canvas
                ref={canvasRef}
                width={window.innerWidth}
                height={window.innerHeight}
                // onClick={handleCanvasClick}
                {...props}
            />
        </>
    )
}