import React, { useState} from 'react';
// import { useRef } from 'react';
// import QrReader from 'react-qr-reader';
import Quagga from 'quagga';
// import Todo from './Todo';
import Barcode from './Barcode';
import './App.css'

const App = () => {
  const [barcode, setBarcode] = useState([]);
  // const [inpututem, setinpututem] = useState([]);
  // let subInput=useRef();

  const handleBarcodeScan = (result) => {
    if (result && result.codeResult) {
      let barcoderesullt=result.codeResult.code
      let barcodes=[...barcode,barcoderesullt]
      setBarcode(barcodes);
      console.log(barcodes)
      Quagga.stop();
    }
  };


  const startBarcodeScanner = () => {
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: document.querySelector('#barcode-scanner'),
          constraints: {
            facingMode: 'environment',
            width:400,
            height:200
          },
        },
        decoder: {
          readers: [
            'code_128_reader',
            'ean_reader',
            'code_93_reader',
            'ean_8_reader',
            'code_39_reader',
            // 'code_39_vin_reader',
            // 'codabar_reader',
            // 'upc_reader',
            // 'upc_e_reader',
            // 'i2of5_reader',
            // 'i2of5_reader',
            // '2of5_reader',
            
          ],
        },
      },
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected(handleBarcodeScan);
  };
  // function submitHendler(){
  //   const task= subInput.current.value;
  //   const taskdone=[...inpututem,task]
  //   setinpututem(taskdone)
  //   console.log(taskdone)
  //   subInput.current.value=''

  // }
  const stopBarcodeScanner = () => {
    Quagga.stop();
  };

  return (
    <div className='App'>
      <div>
        <h2>Barcode Scanner</h2>
        <div id="barcode-scanner" ></div>
        <button className='btn' onClick={startBarcodeScanner}>Start Barcode Scanner</button>
        <button className='btn' onClick={stopBarcodeScanner}>Stop Barcode Scanner</button>
        
        {
          barcode.map((barcode,index)=>{
            return <Barcode id={index+1} title={barcode}/>
          })
        }
        {/* <input ref={subInput} type="text" placeholder='enter the value'/>
        <button onClick={submitHendler}> submit</button>
        {
          inpututem.map((todo,index)=>{
            return<Todo id={index} title={todo}/>
          })
        } */}
      </div>
    </div>
  );
};

export default App;
