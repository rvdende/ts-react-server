import styled, { css, createGlobalStyle } from 'styled-components'

export interface ThemeDefinition {
  name: string;
  body: string;
  bodyAlt: string;
  bodyAltLighter: string;
  text: string;
  toggleBorder: string;
  gradient: string;
  bgSpot: string;
  brandSpot: string;
  focusColor: string;
  alarmColor: string;
  radius: string;
  padding: string;
  inputBorder: string;
}

export const themeProperties = [
  { name: 'name', type: 'string' },
  { name: 'body', type: 'color' },
  { name: 'bodyAlt', type: 'color' },
  { name: 'bodyAltLighter', type: 'color' },
  { name: 'text', type: 'color' },
  { name: 'toggleBorder', type: 'color' },
  { name: 'gradient', type: 'color' },
  { name: 'bgSpot', type: 'color' },
  { name: 'brandSpot', type: 'color' },
  { name: 'focusColor', type: 'color' },
  { name: 'alarmColor', type: 'color' },
  { name: 'radius', type: 'px' },
  { name: 'padding', type: 'px' },
  { name: 'inputBorder', type: 'color' }
]

export const lightTheme: ThemeDefinition = {
  name: 'light',
  body: '#EAF0F2',
  bodyAlt: '#F0F0F0',
  bodyAltLighter: '#F8F8F8',
  text: '#8E8B8B',
  toggleBorder: '#f00',
  gradient: 'linear-gradient(#39598A, #79D7ED)',
  bgSpot: '#D4D4D4',
  brandSpot: '#E64039',
  focusColor: '#343539',
  alarmColor: '#DF3939',
  radius: '15px',
  padding: '15px',
  inputBorder: 'rgba(0,0,0,0.05)'
}

export const darkTheme: ThemeDefinition = {
  name: 'dark',
  body: '#4D4E53',
  bodyAlt: '#35363a',
  bodyAltLighter: '#424348',
  text: '#CCC',
  toggleBorder: '#00f',
  gradient: 'linear-gradient(#091236, #1E215D)',
  bgSpot: '#414248',
  brandSpot: '#E64039',
  focusColor: 'white',
  alarmColor: '#DF3939',
  radius: '7px',
  padding: '15px',
  inputBorder: 'rgba(255,255,255,0.05)'
}

export const theme8bo: ThemeDefinition = {
  name: '8BO',
  body: '#343539',
  bodyAlt: '#35363a',
  bodyAltLighter: '#424348',
  text: '#CCC',
  toggleBorder: '#00f',
  gradient: 'linear-gradient(#091236, #1E215D)',
  bgSpot: '#414248',
  brandSpot: '#E64039',
  focusColor: 'white',
  alarmColor: '#DF3939',
  radius: '7px',
  padding: '15px',
  inputBorder: 'rgba(255,255,255,0.05)'
}

export const themeList: ThemeDefinition[] = [lightTheme, darkTheme]

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  #app {
    overflow: visible;
  }

  a {
    text-decoration: none;
    color: ${({ theme }: { theme: ThemeDefinition }) => theme.brandSpot};
    transition: all 0.1s linear;
    /* border-bottom: 2px solid rgba(0,0,0,0); */
  }

  a:hover {
    text-decoration: none;
    color: ${({ theme }: { theme: ThemeDefinition }) => theme.focusColor};
    /* border-bottom: 2px dashed ${({ theme }: { theme: ThemeDefinition }) => theme.brandSpot}; */
  }

  body {
    background: ${({ theme }: { theme: ThemeDefinition }) => theme.body};
    color: ${({ theme }: { theme: ThemeDefinition }) => theme.text};
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh; */
    margin: 0;
    padding: 10px;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    /* transition: all 0.25s linear; */
  }`
