import * as React from 'react';
import { WidgetComponent } from './widgetcomponent'
import styled, { css } from 'styled-components';
import { themeList, darkTheme, themeProperties } from '../../../theme';
import { api } from '../../../api';
import { Button } from '../button';
import { dashboardService } from '../dashboardService';
import { Select } from '../select';
import { Checkbox } from '../checkbox';
import { InputColor } from '../input_color';
import { Input } from '../input';
import { clone } from '../dashboard';

//test
import { SketchPicker } from 'react-color';

interface BasicWrapProps {
    link?: boolean;
}

const WidgetBasicWrap = styled.div<BasicWrapProps>`
    height: 100%;
    padding: 20px;
    h1 {
        font-size: 28px;
        font-weight: bold;
        color: ${({ theme }) => theme.focusColor};
    }

    ${props => props.link && css`
        cursor: pointer;
        :hover {
            color: ${({ theme }) => theme.focusColor};
            background: ${({ theme }) => theme.brandSpot};
        }
  `};

`;

const DataDisplay = styled.div`
    /* Internet Explorer 10 */
    display: -ms-flexbox;
    -ms-flex-pack: center;
    -ms-flex-align: center;

    /* Firefox */
    display: -moz-box;
    -moz-box-pack: center;
    -moz-box-align: center;

    /* Safari, Opera, and Chrome */
    display: -webkit-box;
    -webkit-box-pack: center;
    -webkit-box-align: center;

    /* W3C */
    display: box;
    box-pack: center;
    box-align: center;

    height: 100%;
`;

const WidgetHeading = styled.div`
color:  ${({ theme }) => theme.focusColor};
    top: 0;
    position: absolute;
    left: 0;
    right :0;
    font-size: 10px;
    opacity: 0.7;
    padding-top: 5px;
    text-transform: uppercase;
    `;

const WidgetFooter = styled.div`
    bottom: 0;
    position: absolute;
    left: 0;
    right :0;
    font-size: 10px;
    padding-bottom: 5px;
    text-transform: uppercase;
`;

const WidgetUnit = styled.div`
    bottom: 0;
    position: absolute;
    left: 0;
    right :0;
    font-size: 10px;
    opacity: 0.7;
    padding-bottom: 20px;
    text-transform: uppercase;
`;

const ThemeBox = styled.div`
    float:left;
    border: 1px solid gray;
    margin: 10px;
    padding: 5px;
`;

const ThemeColorBar = styled.div`
    width: 25px;
    height: 75px;
`;

const ThemeColorBarBox = styled.div`
   display: flex;
    flex: row;
`;


const OptionBox = styled.div`
   border: 2px solid ${({ theme }) => theme.body};
   border-radius: ${({ theme }) => theme.radius};
   display: flex;
   flex-direction: row;
   padding: ${({ theme }) => theme.padding};
`;

export default class WidgetThemes extends WidgetComponent {
    state: any = {
        options: {},
        activethemename: '',
        themes: themeList,
        useDarkTheme: false,
        mainTheme: themeList[0],
        darkTheme: themeList[1]
    }


    componentDidMount() {
        this.getThemeList();
    }

    getThemeList = () => {
        dashboardService.statefind({ query: { key: 'themes' } }, (result) => {
            console.log('getThemeList', result);
            this.setState({
                themes: result.data[0].themes,
                mainTheme: result.data[0].themes[0],
                darkTheme: result.data[0].themes[1]
            })
        }, (error) => {

        })
    }

    createNewTheme = () => {
        dashboardService.stateupdate({ query: { key: 'themes' }, update: { $push: { themes: this.state.selectedTheme } } },
            (result) => {

            },
            (error) => {

            });
    }

    setMainTheme = (mainTheme: ThemeDefinition) => {
        this.setState({ mainTheme });
        api.emit('theme', mainTheme);
    }

    setDarkTheme = (darkTheme: ThemeDefinition) => {
        this.setState({ darkTheme })
        api.emit('theme', darkTheme);
    }

    render() {
        return (
            <WidgetBasicWrap>
                <h1>Theme Library</h1>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Button icon='fas fa-redo' onClick={this.getThemeList} />

                </div>

                <h2>Branding</h2>

                <OptionBox style={{ border: 'none' }}>
                    <div style={{
                        padding: 7,
                        paddingRight: 15,
                        width: 150,
                        textAlign: 'right'
                    }}>
                        {(this.state.useDarkTheme) ? 'Light' : 'Main'} theme:
                    </div>
                    <div style={{ flex: 1 }}>
                        <Select
                            style={{ width: '100%' }}
                            value={JSON.stringify(this.state.mainTheme)}
                            onChange={(e) => {
                                this.setMainTheme(JSON.parse(e.target.value));
                            }} >
                            <option key='none' value=''>select</option>
                            {(this.state.themes).map((r: ThemeDefinition, index: string) => {
                                return <option value={JSON.stringify(r)} key={index}>{r.name}</option>
                            })}</Select>
                    </div>
                </OptionBox>

                <OptionBox>
                    <div style={{ width: 150 }}>
                        <div style={{ float: 'left', paddingTop: 7 }}>
                            <Checkbox checked={this.state.useDarkTheme} onChange={(e) => {
                                this.setState({ useDarkTheme: !this.state.useDarkTheme })
                            }} />
                        </div>
                        <div style={{ float: "right", paddingTop: 9, paddingRight: 15, opacity: this.state.useDarkTheme ? 1 : 0.25 }}>Dark theme:</div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <Select style={{ width: '100%' }}
                            value={JSON.stringify(this.state.darkTheme)}
                            onChange={(e) => {
                                this.setDarkTheme(JSON.parse(e.target.value));
                            }}
                            disabled={!this.state.useDarkTheme}
                        >
                            <option key='none' value=''>select</option>
                            {(this.state.themes).map((r: ThemeDefinition, index: string) => {
                                return <option value={JSON.stringify(r)} key={index}>{r.name}</option>
                            })}</Select>
                    </div>
                </OptionBox>

                <h2>Theme editor</h2>

                <OptionBox style={{ border: 'none' }}>
                    <div style={{
                        padding: 7,
                        paddingRight: 15,
                        width: 150,
                        textAlign: 'right'
                    }}>
                        Select theme:
                    </div>
                    <div style={{ flex: 1 }}>
                        <Select
                            style={{ width: '100%' }}
                            value={JSON.stringify(this.state.selectedTheme)}
                            onChange={(e) => {
                                let selectedTheme = JSON.parse(e.target.value);
                                this.setState({ selectedTheme })
                                api.emit('theme', selectedTheme)
                            }} >
                            <option key='none' value={undefined}>select</option>
                            {(this.state.themes).map((r: ThemeDefinition, index: string) => {
                                return <option value={JSON.stringify(r)} key={index}>{r.name}</option>
                            })}</Select>
                    </div>
                    <div style={{ paddingLeft: 10 }}>
                        <Button icon='fas fa-save' onClick={this.createNewTheme} text='SAVE' />
                    </div>
                </OptionBox>

                <OptionBox style={{ marginTop: 15, display: 'default' }} >
                    {(this.state.selectedTheme) && <ThemeConfigurator theme={this.state.selectedTheme} onChange={(theme) => {

                        let themes = clone(this.state.themes);
                        for (var th of themes) {
                            if (th.name === theme.name) {
                                th = theme
                            }
                        }

                        this.setState({ selectedTheme: theme, themes })
                        api.emit('theme', theme);
                    }} />
                    }</OptionBox>

            </WidgetBasicWrap>
        );
    }
};




class ThemeConfigurator extends React.Component<{ onChange?: (e?: any) => void, theme: ThemeDefinition | any }, { theme: ThemeDefinition }> {
    state: {
        theme: undefined
    }

    render() {
        return <div>

            {themeProperties.map((prop, index) => {
                let width = 300;
                if (prop.type === 'color') { width = 100 }
                if (prop.type === 'px') { width = 120 }
                return <div style={{ width, padding: 10, float: 'left' }}>
                    <div style={{ width: 200, fontSize: 12, paddingBottom: 5 }}>{prop.name}:</div>
                    <div>
                        {(prop.type === 'string') && <Input style={{ width: '100%' }}
                            value={this.props.theme[prop.name]}
                            onChange={(e) => {
                                let change: any = {}
                                change[prop.name] = e.target.value;
                                this.props.onChange({ ...this.props.theme, ...change })
                            }} />}

                        {(prop.type === 'color') && <InputColor type='color' style={{
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            background: this.props.theme[prop.name],
                            width: 40
                        }} value={this.props.theme[prop.name]}
                            onChange={(e) => {
                                let change: any = {}
                                change[prop.name] = e.target.value;
                                this.props.onChange({ ...this.props.theme, ...change })
                            }} />}

                        {(prop.type === 'px') && <Input style={{ width: '100%' }}
                            value={this.props.theme[prop.name]}
                            onChange={(e) => {
                                let change: any = {}
                                change[prop.name] = e.target.value;
                                this.props.onChange({ ...this.props.theme, ...change })
                            }} />}
                    </div>
                </div>
            })}


        </div>
    }
}


// function Test() {
//     return <div>
//         {this.state.themes.map((theme, index) => {
//             return <ThemeBox key={index}
//                 onClick={() => {
//                     this.setState({ activethemename: theme.name })
//                     api.emit('themeChange', theme.name);
//                 }}
//             >   <ThemeColorBarBox>
//                     <ThemeColorBar style={{ background: theme.focusColor }} />
//                     <ThemeColorBar style={{ background: theme.body }} />
//                     <ThemeColorBar style={{ background: theme.bodyAlt }} />
//                     <ThemeColorBar style={{ background: theme.bodyAltLighter }} />
//                     <ThemeColorBar style={{ background: theme.text }} />
//                 </ThemeColorBarBox>
//                 <div>{theme.name} {(this.state.activethemename === theme.name) && 'active'} </div>
//             </ThemeBox>
//         })}
//     </div>
// }