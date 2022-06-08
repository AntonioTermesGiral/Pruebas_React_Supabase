import createTheme from "@mui/material/styles/createTheme";
import { action, computed, observable, makeObservable} from "mobx";

class ThemeViewmodel {

    private static lightTheme = createTheme({
        palette: {
            primary: {
                main: '#42a5f5',
            },
            secondary: {
                main: '#bbdefb',
            },
            background: {
                default: '#e1f5fe'
            }
        },
    })

    private static darkTheme = createTheme({
        palette: {
            primary: {
                main: '#263238',
            },
            secondary: {
                main: '#90a4ae',
            },
            background: {
                default: '#b0bec5',
            },
        }
    })

    static instance : ThemeViewmodel
    @observable darkmode : boolean = false;
    @observable theme = ThemeViewmodel.lightTheme;

    constructor() {
        makeObservable(this)
    }

    static getInstance() : ThemeViewmodel {

        if (ThemeViewmodel.instance === undefined) {
            ThemeViewmodel.instance = new ThemeViewmodel()
        }

        return ThemeViewmodel.instance
        
    }

    @action ToggleColorMode = () => {
        this.darkmode = !this.darkmode
        this.changeTheme()
    }

    @action private changeTheme = () => {

        this.theme = (this.darkmode) ? ThemeViewmodel.darkTheme : ThemeViewmodel.lightTheme

    }

    @computed get getTheme () {
        return this.theme
    }

}

export default ThemeViewmodel;