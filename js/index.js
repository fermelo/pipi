Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}

const day = moment.duration(1, 'day')
let totals = [0,0,0,0];


const Legio = {
    resources: [120,100,150,30],
    name: 'Legio',
    image: 'https://gpack.travian.com/bf994234/mainPage/img_ltr/u/section/u1.png'
}

const Preto = {
    resources: [100,130,160,70],
    name: 'Preto',
    image: 'https://gpack.travian.com/bf994234/mainPage/img_ltr/u/section/u2.png'
}

const Impe = {
    resources: [150,160,210,80],
    name: 'Imperano',
    image: 'https://gpack.travian.com/bf994234/mainPage/img_ltr/u/section/u3.png'
}

const Tori = {
    resources: [550,440,320,100],
    name: 'Tori',
    image: 'https://gpack.travian.com/bf994234/mainPage/img_ltr/u/section/u5.png'
}

const Cata = {
    resources: [950,1350,600,90],
    name: 'Cata',
    image: 'https://gpack.travian.com/bf994234/mainPage/img_ltr/u/section/u8.png'
}


const TroopRow = (data,index) => {
    const tropaMinutes = moment.duration(data.time[0], 'minutes')
    const tropaSeconds = moment.duration(data.time[1], 'seconds')
    const tropasByDay = Math.round(day / (tropaMinutes + tropaSeconds), 0)

    let totalMaterialTropa = data.resources.map( mat => {
        return mat * tropasByDay
    })

    return (
        <tr key={ index }>
            <td>{ data.name }</td>
            <td>{ tropasByDay }</td>
            { totalMaterialTropa.map( (resource,i) => {
                totals[i] += resource;
                return (
                    <td className="text-right" key={ i }>{ resource }</td>
                )
            })}
        </tr>
    )
}

const troopCard = (data, index) => {

    return (
        <div key={index} className="card mb-4 col-md-4 d-flex align-items-stretch">
            <img src={ data.image } className="card-img-top troopImg" alt={ data.name } />
            <div className="card-body">
                <h5 className="card-title">{ data.name }</h5>
                <p className="card-text">{ data.attributes }</p>
            </div>
            <div>
                <table className="table">
                    <tbody>
                        <tr><th>Madera</th><td className="text-right">{data.resources[0]}</td></tr>
                        <tr><th>Barro</th><td className="text-right">{data.resources[1]}</td></tr>
                        <tr><th>Hierro</th><td className="text-right">{data.resources[2]}</td></tr>
                        <tr><th>Cereal</th><td className="text-right">{data.resources[3]}</td></tr>
                        <tr><th>Tiempo</th><td className="text-right">{data.time[0].pad() + ':' + data.time[1].pad()}</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const ResourcesTable = (data) => {

    totals = [0,0,0,0];

    return (
        <div className="container">    
            <table className="table">
                <thead>
                    <tr>
                        <th>Tropa</th>
                        <th>Cantidad de entrenamiento</th>
                        <th className="text-right">Madera total</th>
                        <th className="text-right">Barro total</th>
                        <th className="text-right">Hierro total</th>
                        <th className="text-right">Cereal total</th>
                    </tr>
                </thead>
                <tbody>
                    { data.map( (troop,i) => {
                        return ( TroopRow(troop, i) )
                    })}
                    <tr>
                        <th>TOTAL</th>
                        <td></td>
                        <td className="text-right"> { totals[0] }</td>
                        <td className="text-right"> { totals[1] }</td>
                        <td className="text-right"> { totals[2] }</td>
                        <td className="text-right"> { totals[3] }</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

const PlayerTabs = (player, resources, troops) => {
    return (
        <React.Fragment>
            <ul className="nav nav-pills mb-3" id={`pills-tab-${player}`} role="tablist">
                <li className="nav-item" role="presentation">
                    <a className="nav-link active" id={`pills-resources-tab-${player}`} data-toggle="pill" href={`#pills-resources-${player}`} role="tab" aria-controls={`pills-resources-${player}`} aria-selected="true">Recursos</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className="nav-link" id={`pills-troops-tab-${player}`} data-toggle="pill" href={`#pills-troops-${player}`} role="tab" aria-controls={`pills-troops${player}`} aria-selected="false">Tropas</a>
                </li>
            </ul>
            <div className="tab-content" id={`pills-tabContent-${player}`}>
                <div className="tab-pane fade show active" id={`pills-resources-${player}`} role="tabpanel" aria-labelledby={`pills-resources-tab${player}`}>{ ResourcesTable(resources) }</div>
                <div className="tab-pane fade" id={`pills-troops-${player}`} role="tabpanel" aria-labelledby={`pills-troops-tab-${player}`}>
                        <div className="row">
                            { troops.map ( (troop,index) => {
                                return troopCard(troop, index)
                            })}
                        </div>
                </div>
            </div>
        </React.Fragment>
    )
}

const Amudiel = () => {
    const myImpe = {...Impe, time: [3,39], attributes: 'Cuartel 20 + casco del 10%'}
    const myTori = {...Tori, time: [4,16], attributes: 'Establo 20 + Abrevadero 15 + casco del 10%'}
    const myCata = {...Cata, time: [26,8], attributes: 'Taller a 17'}
    
    return(
        PlayerTabs('amudiel', [myImpe, myTori, myCata], [myImpe, myTori, myCata])
    )

}

const Nefili = () => {
    const myPreto = {...Preto, time: [3,43], attributes: 'Cuartel 20'}
    const myLegio = {...Legio, time: [3,23], attributes: 'Cuartel 20'}
    
    return(
        PlayerTabs('nefili', [myPreto, myPreto, myPreto, myPreto, myPreto, myPreto, myLegio], [myLegio, myPreto])
    )
}

const Lamia = () => {
    const myPreto = {...Preto, time: [3,43], attributes: 'Cuartel 20 x 6'}
    const myTori = {...Tori, time: [4,16], attributes: 'Establo 20 + Abrevadero 15 + casco del 10%'}
    
    return(
        PlayerTabs('lamia', [myPreto, myPreto, myPreto, myPreto, myPreto, myPreto, myTori], [myPreto, myTori])
    )
}

const Home = () => {
    return (
        <div className="container pt-sm-5">
            <div className="row">
                <div className="col-3">
                    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Amudiel</a>
                    <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Nefili</a>
                    <a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Lamia</a>
                    </div>
                </div>
                <div className="col-9">
                    <div className="tab-content" id="v-pills-tabContent">
                        <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">{ Amudiel() }</div>
                        <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab"> { Nefili() } </div>
                        <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">{ Lamia() }</div>
                        
                    </div>
                </div>
            </div>
        </div>

    )
}


ReactDOM.render(
  Home(),
  document.getElementById('root')
);
