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
import { clone, generateDifficult } from '../dashboard';


interface BasicWrapProps {
    link?: boolean;
}

const WidgetBasicWrap = styled.div<BasicWrapProps>`
    height: 100%;
    padding: ${({ theme }) => theme.padding};
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



const OptionBox = styled.div`
   border: 2px solid ${({ theme }) => theme.body};
   border-radius: ${({ theme }) => theme.radius};
   display: flex;
   flex-direction: row;
   padding: ${({ theme }) => theme.padding};

   .leftSide {
       width: 150px;
       text-align: right;
       padding-right: ${({ theme }) => theme.padding};
   }
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

    getThemeList = (cb?: any) => {
        dashboardService.statefind({ query: { key: 'themes' } }, (result) => {
            console.log('getThemeList', result);
            let mainTheme = (result.data[0].mainTheme) ? result.data[0].mainTheme : result.data[0].themes[0];
            let darkTheme = (result.data[0].darkTheme) ? result.data[0].darkTheme : result.data[0].themes[1];
            let useDarkTheme = (result.data[0].useDarkTheme) ? result.data[0].useDarkTheme : false;
            this.setState({
                themes: result.data[0].themes,
                mainTheme,
                darkTheme,
                useDarkTheme
            }, () => { if (cb) { cb(); } })
        }, (error) => {

        })
    }

    newTheme = () => {
        let newTheme;
        if (this.state.selectedTheme) {
            newTheme = clone(this.state.selectedTheme);
        } else {
            newTheme = clone(this.state.mainTheme);
        }

        newTheme.id = generateDifficult(32);
        newTheme.name = 'Untitled Theme'
        this.setState({ selectedTheme: newTheme })
        dashboardService.stateupdate({ query: { key: 'themes' }, update: { $push: { themes: newTheme } } },
            (result) => {
                this.getThemeList();
            },
            (error) => {

            });
    }

    saveTheme = () => {
        dashboardService.stateupdate({
            query: { key: 'themes', 'themes.id': this.state.selectedTheme.id },
            update: { $set: { 'themes.$': this.state.selectedTheme } }
        },
            (result) => {
                this.getThemeList();
            },
            (error) => {

            });
    }

    deleteTheme = () => {
        dashboardService.stateupdate({ query: { key: 'themes' }, update: { $pull: { themes: this.state.selectedTheme } } },
            (s) => {

                this.getThemeList(() => {
                    this.setState({ selectedTheme: this.state.themes[0] })
                    api.emit('theme', this.state.themes[0])
                });

            },
            (e) => { })
    }

    setMainTheme = (mainTheme: ThemeDefinition) => {
        this.setState({ mainTheme });
        api.emit('theme', mainTheme);
        dashboardService.stateupdate({ query: { key: 'themes' }, update: { $set: { mainTheme } } })
    }

    setDarkTheme = (darkTheme: ThemeDefinition) => {
        this.setState({ darkTheme })
        api.emit('theme', darkTheme);
        dashboardService.stateupdate({ query: { key: 'themes' }, update: { $set: { darkTheme } } })
    }

    toggleUseDarkTheme = () => {
        let useDarkTheme = !this.state.useDarkTheme;
        this.setState({ useDarkTheme });
        dashboardService.stateupdate({ query: { key: 'themes' }, update: { $set: { useDarkTheme } } })
    }

    render() {
        return (
            <WidgetBasicWrap>
                <h1>Themes</h1>
                <OptionBox style={{ border: 'none' }}>
                    <div className='leftSide'>
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
                    <div className='leftSide'>
                        <div style={{ float: 'left' }}>
                            <Checkbox checked={this.state.useDarkTheme} onChange={this.toggleUseDarkTheme} />
                        </div>
                        <div style={{ float: "right", opacity: this.state.useDarkTheme ? 1 : 0.25 }}>Dark theme:</div>
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
                            <option key='none' value={' '}>select</option>
                            {(this.state.themes).map((r: ThemeDefinition, index: string) => {
                                return <option value={JSON.stringify(r)} key={index}>{r.name}</option>
                            })}</Select>
                    </div>

                    <Button icon='fas fa-save' onClick={this.saveTheme} style={{ marginLeft: 5 }} />
                    <Button icon='fas fa-times' onClick={this.deleteTheme} style={{ marginLeft: 5 }} />
                    <Button icon='fas fa-plus' onClick={this.newTheme} style={{ marginLeft: 5 }} />
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
                return <div key={index} style={{ width, padding: 10, float: 'left' }}>
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

