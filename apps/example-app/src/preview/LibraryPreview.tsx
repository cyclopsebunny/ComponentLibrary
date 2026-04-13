import { useState } from 'react';
import { ButtonShowcase } from '../components/ButtonShowcase';
import { CheckboxFieldShowcase } from '../components/CheckboxFieldShowcase';
import { RadioFieldShowcase } from '../components/RadioFieldShowcase';
import { SwitchFieldShowcase } from '../components/SwitchFieldShowcase';
import { IconsShowcase } from '../components/IconsShowcase';
import { InputFieldShowcase } from '../components/InputFieldShowcase';
import { SearchFieldShowcase } from '../components/SearchFieldShowcase';
import { LocationPickerRightNavShowcase } from '../components/LocationPickerRightNavShowcase';
import { NavigationShowcase } from '../components/NavigationShowcase';
import { TabsShowcase } from '../components/TabsShowcase';
import { TextareaShowcase } from '../components/TextareaShowcase';
import { SegmentedControlShowcase } from '../components/SegmentedControlShowcase';
import { SelectFieldShowcase } from '../components/SelectFieldShowcase';
import { LoginScreen } from '../components/LoginScreen';
import { OverviewSection } from './OverviewSection';
import { TokensAndStylesShowcase } from './TokensAndStylesShowcase';

type TabId =
  | 'overview'
  | 'tokens'
  | 'button'
  | 'checkbox'
  | 'radio'
  | 'switch'
  | 'navigation'
  | 'locationRight'
  | 'tabs'
  | 'icons'
  | 'input'
  | 'search'
  | 'textarea'
  | 'segmented'
  | 'select'
  | 'login';

type TabGroup = {
  label: string;
  items: { id: TabId; label: string }[];
};

const groups: TabGroup[] = [
  {
    label: 'General',
    items: [
      { id: 'overview', label: 'Overview & roadmap' },
      { id: 'login',    label: 'Login screen' },
      { id: 'tokens',   label: 'Tokens & global CSS' },
      { id: 'icons',    label: 'Icons' },
    ],
  },
  {
    label: 'Form Inputs',
    items: [
      { id: 'button',   label: 'Button' },
      { id: 'input',    label: 'Input Field' },
      { id: 'textarea', label: 'Textarea' },
      { id: 'search',   label: 'Search Field' },
      { id: 'checkbox', label: 'Checkbox' },
      { id: 'radio',    label: 'Radio' },
      { id: 'switch',   label: 'Switch' },
      { id: 'segmented', label: 'Segmented control' },
      { id: 'select', label: 'Select (dropdown)' },
    ],
  },
  {
    label: 'Navigation',
    items: [
      { id: 'navigation',    label: 'Side Panel' },
      { id: 'locationRight', label: 'Location & right rail' },
      { id: 'tabs',          label: 'Tabs' },
    ],
  },
];

const SIDEBAR_WIDTH = 220;

export function LibraryPreview() {
  const [tab, setTab] = useState<TabId>('overview');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside
        style={{
          width: SIDEBAR_WIDTH,
          minWidth: SIDEBAR_WIDTH,
          maxWidth: SIDEBAR_WIDTH,
          background: '#ffffff',
          borderRight: '1px solid #e8e8e8',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflowY: 'auto',
          flexShrink: 0,
        }}
      >
        {/* Logo / title */}
        <div
          style={{
            padding: '20px 16px 16px',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <span
            style={{
              display: 'block',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#94a3b8',
              marginBottom: 4,
            }}
          >
            Component Library
          </span>
          <span
            style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 600,
              color: '#17191c',
              fontFamily: 'monospace',
            }}
          >
            @cl/core
          </span>
        </div>

        {/* Nav groups */}
        <nav style={{ flex: 1, padding: '12px 8px' }}>
          {groups.map((group) => (
            <div key={group.label} style={{ marginBottom: 20 }}>
              <p
                style={{
                  margin: '0 0 4px 8px',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#94a3b8',
                }}
              >
                {group.label}
              </p>
              {group.items.map((item) => {
                const active = tab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTab(item.id)}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '7px 10px',
                      borderRadius: 6,
                      border: 'none',
                      background: active ? 'var(--light-primary-100, #e0ebff)' : 'transparent',
                      color: active ? 'var(--light-primary-default, #172dbd)' : '#374151',
                      fontWeight: active ? 600 : 400,
                      fontSize: 14,
                      cursor: 'pointer',
                      transition: 'background 0.1s, color 0.1s',
                      marginBottom: 2,
                    }}
                    onMouseEnter={(e) => {
                      if (!active) (e.currentTarget as HTMLButtonElement).style.background = '#f1f5f9';
                    }}
                    onMouseLeave={(e) => {
                      if (!active) (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>

      {/* ── Main content ────────────────────────────────────────────────── */}
      <main style={{ flex: 1, minWidth: 0, background: '#ffffff', overflowY: 'auto' }}>
        {tab === 'overview'      && <OverviewSection />}
        {tab === 'login'         && <LoginScreen />}
        {tab === 'tokens'        && <TokensAndStylesShowcase />}
        {tab === 'button'        && <ButtonShowcase />}
        {tab === 'checkbox'      && <CheckboxFieldShowcase />}
        {tab === 'radio'         && <RadioFieldShowcase />}
        {tab === 'switch'        && <SwitchFieldShowcase />}
        {tab === 'navigation'    && <NavigationShowcase />}
        {tab === 'locationRight' && <LocationPickerRightNavShowcase />}
        {tab === 'tabs'          && <TabsShowcase />}
        {tab === 'textarea'      && <TextareaShowcase />}
        {tab === 'icons'         && <IconsShowcase />}
        {tab === 'input'         && <InputFieldShowcase />}
        {tab === 'search'        && <SearchFieldShowcase />}
        {tab === 'segmented'     && <SegmentedControlShowcase />}
        {tab === 'select'        && <SelectFieldShowcase />}
      </main>
    </div>
  );
}
