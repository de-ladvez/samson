import React, {useEffect, useState} from "react";
import style from "./BarCodeScaner.scss"
import {BrowserMultiFormatReader, NotFoundException} from "@zxing/library"

const BarCodeScaner = (props) => {
    const codeReader = new BrowserMultiFormatReader();
    const [deviceName, setDeviceName] = useState();
    const [devices, setDevices] = useState();
    const [openScan, setOpenScan] = useState(false);

    const handleSartScan = (fun) => {
        codeReader.decodeFromVideoDevice(deviceName, 'video', (result, err) => {
            setOpenScan(true);
            if (result) {
                fun({barcode: result.text});
                codeReader.reset();
                setOpenScan(false);
            }
            if (err && !(err instanceof NotFoundException)) {
                fun({err});
            }
        })
    };

    const handleStopScan = () => {
        codeReader.reset();
        setOpenScan(false);
    };

    useEffect(() => {
        codeReader.getVideoInputDevices()
            .then((videoInputDevices) => {
                    setDeviceName(videoInputDevices[0].deviceId)
                setDevices(videoInputDevices);
                // const sourceSelect = document.getElementById('sourceSelect')
                // selectedDeviceId = videoInputDevices[0].deviceId
                    // if (videoInputDevices.length >= 1) {
                    //     videoInputDevices.forEach((element) => {
                    // const sourceOption = document.createElement('option')
                    // sourceOption.text = element.label;
                    // sourceOption.value = element.deviceId;
                    // sourceSelect.appendChild(sourceOption)
                    // setDevice(element.deviceId)
                    // });
                    // sourceSelect.onchange = () => {
                    //     selectedDeviceId = sourceSelect.value;
                    // };
                    // const sourceSelectPanel = document.getElementById('sourceSelectPanel')
                    // sourceSelectPanel.style.display = 'block'
                    // }
                }
            )

    }, []);
    return (
        <>
            <div onClick={() => {
                props.startAction(handleSartScan)
            }} className={[style.button, props.classButton].join(" ")}>{props.nameButton}</div>
                    <div onClick={handleStopScan} className={[style.bgVideo, openScan || style.hide].join(" ")}></div>
            <video
                id="video"
                className={[style.video, props.classVideo].join(" ")}
                width={props.width || 300}
                height={props.height || 300}
            ></video>
        </>
    );
};

export default BarCodeScaner;