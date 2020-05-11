import moment from 'moment';

export default ({ filename, objects }) => ({
    SaveName: filename,
    GameMode: 'None',
    Gravity: 0.5,
    PlayArea: 0.5,
    Date: moment().format('M/D/YYYY h:mm:ss A'),
    Table: 'Table_Custom_Square',
    TableURL: 'http://cloud-3.steamusercontent.com/ugc/1014939826507750348/2794191656E0A3698EFE509E18A2006DFC1F2B6C/',
    Sky: 'Sky_Cathedral',
    Note: '',
    Rules: '',
    XmlUI: '',
    LuaScript: '',
    LuaScriptState: '',
    Grid: {
        Type: 0,
        Lines: false,
        Color: {
            r: 0.0,
            g: 0.0,
            b: 0.0,
        },
        Opacity: 0.75,
        ThickLines: false,
        Snapping: false,
        Offset: false,
        BothSnapping: false,
        xSize: 2.0,
        ySize: 2.0,
        PosOffset: {
            x: 0.0,
            y: 1.0,
            z: 0.0,
        },
    },
    Lighting: {
        LightIntensity: 0.54,
        LightColor: {
            r: 1.0,
            g: 0.9804,
            b: 0.8902,
        },
        AmbientIntensity: 1.3,
        AmbientType: 0,
        AmbientSkyColor: {
            r: 0.5,
            g: 0.5,
            b: 0.5,
        },
        AmbientEquatorColor: {
            r: 0.5,
            g: 0.5,
            b: 0.5,
        },
        AmbientGroundColor: {
            r: 0.5,
            g: 0.5,
            b: 0.5,
        },
        ReflectionIntensity: 1.0,
        LutIndex: 0,
        LutContribution: 1.0,
    },
    Hands: {
        Enable: true,
        DisableUnused: true,
        Hiding: 0,
        HandTransforms: [{
            Color: 'Red',
            Transform: {
                posX: -12.3078938,
                posY: 3.66349268,
                posZ: -12.4467239,
                rotX: 0.0,
                rotY: 45.0000038,
                rotZ: 0.0,
                scaleX: 9.413998,
                scaleY: 8.96114,
                scaleZ: 5.465847,
            },
        },
        {
            Color: 'Yellow',
            Transform: {
                posX: -12.3997517,
                posY: 3.6634984,
                posZ: 12.199688,
                rotX: 0.0,
                rotY: 135.0,
                rotZ: 0.0,
                scaleX: 9.414028,
                scaleY: 8.96114,
                scaleZ: 5.465863,
            },
        },
        {
            Color: 'Purple',
            Transform: {
                posX: 17.3902683,
                posY: 3.663497,
                posZ: 0.044939518,
                rotX: 0.0,
                rotY: 270.0,
                rotZ: 0.0,
                scaleX: 9.414041,
                scaleY: 8.96114,
                scaleZ: 5.465866,
            },
        },
        {
            Color: 'Blue',
            Transform: {
                posX: 12.36914,
                posY: 3.66349554,
                posZ: 12.2303085,
                rotX: 0.0,
                rotY: 225.0,
                rotZ: 0.0,
                scaleX: 9.41399,
                scaleY: 8.96114,
                scaleZ: 5.46584129,
            },
        },
        {
            Color: 'White',
            Transform: {
                posX: 4.76837158E-06,
                posY: 3.66349745,
                posZ: -17.3453884,
                rotX: 0.0,
                rotY: 0.0,
                rotZ: 0.0,
                scaleX: 9.413994,
                scaleY: 8.96114,
                scaleZ: 5.46584272,
            },
        },
        {
            Color: 'Green',
            Transform: {
                posX: -1.43051147E-06,
                posY: 3.66349554,
                posZ: 17.1985016,
                rotX: 0.0,
                rotY: 179.8,
                rotZ: 0.0,
                scaleX: 9.414031,
                scaleY: 8.96114,
                scaleZ: 5.46588,
            },
        },
        {
            Color: 'Pink',
            Transform: {
                posX: 12.3691339,
                posY: 3.663496,
                posZ: -12.1405659,
                rotX: 0.0,
                rotY: 315.0,
                rotZ: 0.0,
                scaleX: 9.414,
                scaleY: 8.96114,
                scaleZ: 5.465846,
            },
        },
        {
            Color: 'Orange',
            Transform: {
                posX: -17.4208832,
                posY: 3.663496,
                posZ: -0.169384956,
                rotX: 0.0,
                rotY: 90.0,
                rotZ: 0.0,
                scaleX: 9.414045,
                scaleY: 8.96114,
                scaleZ: 5.465868,
            },
        }],
    },
    Turns: {
        Enable: false,
        Type: 0,
        TurnOrder: [],
        Reverse: false,
        SkipEmpty: false,
        DisableInteractions: false,
        PassTurns: true,
    },
    ObjectStates: objects,
    DecalPallet: [],
    TabStates: {
        0: {
            title: 'Rules',
            body: '',
            color: 'Grey',
            visibleColor: {
                r: 0.5,
                g: 0.5,
                b: 0.5,
            },
            id: 0,
        },
        1: {
            title: 'White',
            body: '',
            color: 'White',
            visibleColor: {
                r: 1.0,
                g: 1.0,
                b: 1.0,
            },
            id: 1,
        },
        2: {
            title: 'Brown',
            body: '',
            color: 'Brown',
            visibleColor: {
                r: 0.443,
                g: 0.231,
                b: 0.09,
            },
            id: 2,
        },
        3: {
            title: 'Red',
            body: '',
            color: 'Red',
            visibleColor: {
                r: 0.856,
                g: 0.1,
                b: 0.094,
            },
            id: 3,
        },
        4: {
            title: 'Orange',
            body: '',
            color: 'Orange',
            visibleColor: {
                r: 0.956,
                g: 0.392,
                b: 0.113,
            },
            id: 4,
        },
        5: {
            title: 'Yellow',
            body: '',
            color: 'Yellow',
            visibleColor: {
                r: 0.905,
                g: 0.898,
                b: 0.172,
            },
            id: 5,
        },
        6: {
            title: 'Green',
            body: '',
            color: 'Green',
            visibleColor: {
                r: 0.192,
                g: 0.701,
                b: 0.168,
            },
            id: 6,
        },
        7: {
            title: 'Blue',
            body: '',
            color: 'Blue',
            visibleColor: {
                r: 0.118,
                g: 0.53,
                b: 1.0,
            },
            id: 7,
        },
        8: {
            title: 'Teal',
            body: '',
            color: 'Teal',
            visibleColor: {
                r: 0.129,
                g: 0.694,
                b: 0.607,
            },
            id: 8,
        },
        9: {
            title: 'Purple',
            body: '',
            color: 'Purple',
            visibleColor: {
                r: 0.627,
                g: 0.125,
                b: 0.941,
            },
            id: 9,
        },
        10: {
            title: 'Pink',
            body: '',
            color: 'Pink',
            visibleColor: {
                r: 0.96,
                g: 0.439,
                b: 0.807,
            },
            id: 10,
        },
        11: {
            title: 'Black',
            body: '',
            color: 'Black',
            visibleColor: {
                r: 0.25,
                g: 0.25,
                b: 0.25,
            },
            id: 11,
        },
    },
    VersionNumber: 'v12.3.5',
});