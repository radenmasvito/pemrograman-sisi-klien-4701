/*Biodata Diri

function App(){
    return (
        <>
            <h1>Biodata Diri</h1>
            <h2>Nama: Vito Zharfan Syarif Prayogo</h2>
            <h2>NIM: A11.2021.13602</h2>
            <h2>Hoby: Penggemar Bus</h2>
            <h2>Program Studi: Teknik Informatika</h2>
        </>
    );

}

*/

import Menyapa from './Menyapa.jsx';

function Biodata({nama, nim, hobby, programStudi}){
    /* cara untuk beberapa statemnet dengan <> ... </> */
    return <>
    <table border="1">
        <tr>
            <td>Nama</td>
            <td>NIM</td>
            <td>Hobby</td>
            <td>Program Studi</td>
            </tr>
            <td>{nama}</td>
            <td>{nim}</td>
            <td>{hobby}</td>
            <td>{programStudi}</td>
        </table>
    </>
}

/* 1 komponen bisa dipanggil atau pakai komponen lain*/

function App(){
    /*pakai komponen tanpa parameter dan pakai komponen dengan parameter*/
    return (
        <>
            <Menyapa/>
            <Menyapa/>
            <Menyapa/>
            <Biodata 
            nama="Vito Zharfan Syarif Prayogo" 
            nim="A11.2021.13602" 
            hobby="Penggemar Bus"
            programStudi="Teknik Informatika"/>
        </>
    );
}

export default App;