import { useState } from 'react';
import * as Icons from '@component-library/core';

type IconComponent = React.FC<{ size?: number; color?: string; className?: string }>;

// All icons grouped by family
const ICON_GROUPS: { label: string; icons: { name: string; component: IconComponent }[] }[] = [
  {
    label: 'Activity',
    icons: [
      { name: 'Outlined', component: Icons.ActivityOutlinedIcon },
      { name: 'Filled', component: Icons.ActivityFilledIcon },
    ],
  },
  {
    label: 'Amazon Delivery',
    icons: [{ name: 'Default', component: Icons.AmazondeliveryDefaultIcon }],
  },
  {
    label: 'Amenities',
    icons: [
      { name: 'Elevator', component: Icons.AmmenitiesElevatorIcon },
      { name: 'Gym', component: Icons.AmmenitiesGymIcon },
      { name: 'Pool', component: Icons.AmmenitiesPoolIcon },
    ],
  },
  {
    label: 'App Invite',
    icons: [
      { name: 'Pending', component: Icons.AppinviteInvitePendingIcon },
      { name: 'Accepted', component: Icons.AppinviteInviteAcceptedIcon },
      { name: 'Settings', component: Icons.AppinviteAppSettingsIcon },
    ],
  },
  {
    label: 'Arrow',
    icons: [
      { name: 'Back', component: Icons.ArrowBackIcon },
      { name: 'Forward', component: Icons.ArrowForwardIcon },
      { name: 'Down', component: Icons.ArrowdownDownIcon },
      { name: 'Up', component: Icons.ArrowdownUpIcon },
    ],
  },
  {
    label: 'Available',
    icons: [
      { name: 'False', component: Icons.AvailableFalseIcon },
      { name: 'True', component: Icons.AvailableTrueIcon },
    ],
  },
  {
    label: 'Battery',
    icons: [
      { name: 'Full', component: Icons.BatteryFullIcon },
      { name: 'Down', component: Icons.BatteryDownIcon },
      { name: 'Half', component: Icons.BatteryHalfIcon },
      { name: 'Low', component: Icons.BatteryLowIcon },
      { name: 'Empty', component: Icons.BatteryEmptyIcon },
      { name: 'Charging', component: Icons.BatteryChargingIcon },
    ],
  },
  {
    label: 'Bell',
    icons: [
      { name: 'Outlined', component: Icons.BellOutlinedIcon },
      { name: 'Outlined Alert', component: Icons.BellOutlinedalertIcon },
      { name: 'Filled', component: Icons.BellFilledIcon },
      { name: 'Filled Alert', component: Icons.BellFilledalertIcon },
    ],
  },
  {
    label: 'Billing',
    icons: [{ name: 'Default', component: Icons.BillingDefaultIcon }],
  },
  {
    label: 'Block',
    icons: [
      { name: 'Outlined', component: Icons.BlockOutlinedIcon },
      { name: 'Filled', component: Icons.BlockFilledIcon },
    ],
  },
  {
    label: 'Building',
    icons: [
      { name: 'Outline', component: Icons.BuildingOutlineIcon },
      { name: 'Filled', component: Icons.BuildingFilledIcon },
    ],
  },
  {
    label: 'Calendar',
    icons: [
      { name: 'Default', component: Icons.CalendarDefaultOutlinedIcon },
      { name: 'Default Filled', component: Icons.CalendarDefaultFilledIcon },
      { name: 'Add', component: Icons.CalendarAddOutlinedIcon },
      { name: 'Remove', component: Icons.CalendarRemoveOutlinedIcon },
      { name: 'Run', component: Icons.CalendarRunOutlinedIcon },
      { name: 'Update', component: Icons.CalendarUpdateOutlinedIcon },
    ],
  },
  {
    label: 'Camera',
    icons: [
      { name: 'Default Outlined', component: Icons.CameraDefaultOutlinedIcon },
      { name: 'Default Filled', component: Icons.CameraDefaultFilledIcon },
      { name: 'Disabled Outlined', component: Icons.CameraDisabledOutlinedIcon },
      { name: 'Disabled Filled', component: Icons.CameraDisabledFilledIcon },
    ],
  },
  {
    label: 'Car',
    icons: [
      { name: 'Outlined', component: Icons.CarOutlinedIcon },
      { name: 'Filled', component: Icons.CarFilledIcon },
    ],
  },
  {
    label: 'Cellular',
    icons: [{ name: 'Default', component: Icons.CellularDefaultIcon }],
  },
  {
    label: 'Chat',
    icons: [
      { name: 'Outlined', component: Icons.ChatOutlinedIcon },
      { name: 'Filled', component: Icons.ChatFilledIcon },
      { name: 'Closed', component: Icons.ChatClosedchatIcon },
      { name: 'Long Red', component: Icons.ChatlongRedIcon },
      { name: 'Long Green', component: Icons.ChatlongGreenIcon },
      { name: 'Long Grey', component: Icons.ChatlongGreyIcon },
    ],
  },
  {
    label: 'Check / Checkbox',
    icons: [
      { name: 'Check', component: Icons.CheckDefaultIcon },
      { name: 'Checkmark Outlined', component: Icons.CheckmarkOutlinedIcon },
      { name: 'Checkmark Filled', component: Icons.CheckmarkFilledIcon },
      { name: 'Checkbox Filled', component: Icons.CheckboxFilledIcon },
    ],
  },
  {
    label: 'Clicker',
    icons: [
      { name: 'Outline', component: Icons.ClickerOutlineIcon },
      { name: 'Outline 2', component: Icons.ClickerOutline2Icon },
      { name: 'Filled 1', component: Icons.ClickerFilled1Icon },
      { name: 'Filled 2', component: Icons.ClickerFilled2Icon },
    ],
  },
  {
    label: 'Clock',
    icons: [
      { name: 'Outlined', component: Icons.ClockOutlinedIcon },
      { name: 'Filled', component: Icons.ClockFilledIcon },
    ],
  },
  {
    label: 'Close',
    icons: [{ name: 'Default', component: Icons.CloseDefaultIcon }],
  },
  {
    label: 'Cloud',
    icons: [
      { name: 'Outlined', component: Icons.CloudOutlinedIcon },
      { name: 'Filled', component: Icons.CloudFilledIcon },
    ],
  },
  {
    label: 'Commercial Door',
    icons: [{ name: 'Service', component: Icons.CommercialdoorServiceIcon }],
  },
  {
    label: 'Copy / Cut',
    icons: [
      { name: 'Copy', component: Icons.CopyDefaultIcon },
      { name: 'Cut', component: Icons.CutDefaultIcon },
    ],
  },
  {
    label: 'Counter',
    icons: [
      { name: 'Outline', component: Icons.CounterOutlineIcon },
      { name: 'Filled', component: Icons.CounterFilledIcon },
    ],
  },
  {
    label: 'Cycles',
    icons: [
      { name: 'Up/Down', component: Icons.CyclesUpdownIcon },
      { name: 'In/Out', component: Icons.CyclesInoutIcon },
    ],
  },
  {
    label: 'Dashboard',
    icons: [
      { name: 'Outlined', component: Icons.DashboardOutlinedIcon },
      { name: 'Filled', component: Icons.DashboardFilledIcon },
    ],
  },
  {
    label: 'Delete',
    icons: [
      { name: 'Outlined', component: Icons.DeleteOutlinedIcon },
      { name: 'Outlined Bulk', component: Icons.DeleteOutlinedBulkIcon },
      { name: 'Filled', component: Icons.DeleteFilledIcon },
      { name: 'Filled Bulk', component: Icons.DeleteFilledBulkIcon },
      { name: 'Delete Text', component: Icons.DeletetextDefaultIcon },
    ],
  },
  {
    label: 'Delivery',
    icons: [
      { name: 'Outlined', component: Icons.DeliveryOutlinedIcon },
      { name: 'Filled', component: Icons.DeliveryFilledIcon },
    ],
  },
  {
    label: 'Device GDO',
    icons: [
      { name: 'Default', component: Icons.DevicegdoDefaultIcon },
      { name: 'Variant 2', component: Icons.DevicegdoVariant2Icon },
    ],
  },
  {
    label: 'Directional Arrow',
    icons: [
      { name: 'Left Large', component: Icons.DirectionalarrowLeftLargeIcon },
      { name: 'Right Large', component: Icons.DirectionalarrowRightLargeIcon },
      { name: 'Up Large', component: Icons.DirectionalarrowUpLargeIcon },
      { name: 'Down Large', component: Icons.DirectionalarrowDownLargeIcon },
      { name: 'Left Default', component: Icons.DirectionalarrowLeftDefaultIcon },
      { name: 'Right Default', component: Icons.DirectionalarrowRightDefaultIcon },
      { name: 'Up Default', component: Icons.DirectionalarrowUpDefaultIcon },
      { name: 'Down Default', component: Icons.DirectionalarrowDownDefaultIcon },
    ],
  },
  {
    label: 'Document',
    icons: [{ name: 'Default', component: Icons.DocumentDefaultIcon }],
  },
  {
    label: 'Doors',
    icons: [
      { name: 'Open', component: Icons.DoorsOpenIcon },
      { name: 'Action Open', component: Icons.DoorsActionopenIcon },
      { name: 'Action Close', component: Icons.DoorsActioncloseIcon },
      { name: 'Closed', component: Icons.DoorsClosedIcon },
      { name: 'Offline', component: Icons.DoorsOfflineIcon },
      { name: 'Service Needed', component: Icons.DoorsServiceneededIcon },
    ],
  },
  {
    label: 'Download / Upload',
    icons: [
      { name: 'Download Outlined', component: Icons.DownloadOutlinedIcon },
      { name: 'Download Filled', component: Icons.DownloadFilledIcon },
      { name: 'DL+UL Outline', component: Icons.DownloadanduploadOutlineIcon },
      { name: 'DL+UL Filled', component: Icons.DownloadanduploadFilledIcon },
      { name: 'DL+UL Outline 2', component: Icons.DownloadanduploadOutline2Icon },
      { name: 'DL+UL Filled 2', component: Icons.DownloadanduploadFilled2Icon },
    ],
  },
  {
    label: 'Drag & Drop',
    icons: [{ name: 'Default', component: Icons.DraganddropDefaultIcon }],
  },
  {
    label: 'Duration',
    icons: [
      { name: 'Outlined', component: Icons.DurationOutlinedIcon },
      { name: 'Filled', component: Icons.DurationFilledIcon },
    ],
  },
  {
    label: 'Edit',
    icons: [
      { name: 'Outlined', component: Icons.EditOutlinedIcon },
      { name: 'Filled', component: Icons.EditFilledIcon },
    ],
  },
  {
    label: 'Ethernet',
    icons: [{ name: 'Default', component: Icons.EthernetDefaultIcon }],
  },
  {
    label: 'Expand / Collapse',
    icons: [
      { name: 'Default', component: Icons.ExpandDefaultIcon },
      { name: 'Variant 2', component: Icons.ExpandVariant2Icon },
      { name: 'Expand All', component: Icons.ExpandcollapseallExpandallIcon },
      { name: 'Collapse All', component: Icons.ExpandcollapseallCollapseallIcon },
    ],
  },
  {
    label: 'Filter',
    icons: [
      { name: 'Default', component: Icons.FilterDefaultIcon },
      { name: 'Active', component: Icons.FilterActiveIcon },
    ],
  },
  {
    label: 'Firmware',
    icons: [{ name: 'Default', component: Icons.FirmwareDefaultIcon }],
  },
  {
    label: 'Gallery',
    icons: [
      { name: 'Outlined', component: Icons.GalleryOutlinedIcon },
      { name: 'Filled', component: Icons.GalleryFilledIcon },
    ],
  },
  {
    label: 'Gate',
    icons: [
      { name: 'Closed', component: Icons.GateClosedIcon },
      { name: 'Open', component: Icons.GateOpenIcon },
      { name: 'Offline', component: Icons.GateOfflineIcon },
      { name: 'Service', component: Icons.GateServiceIcon },
      { name: 'Arm Gate', component: Icons.GateArmgateIcon },
      { name: 'Arm Open', component: Icons.GateArmgateopenIcon },
      { name: 'Arm Hold Open', component: Icons.GateArmgateholdopenIcon },
      { name: 'Arm Hold Close', component: Icons.GateArmgateholdcloseIcon },
      { name: 'Arm Alt', component: Icons.GateArmgatealtIcon },
      { name: 'Arm Alt Hold', component: Icons.GateArmgatealtholdcloseIcon },
      { name: 'Arm Alt Open', component: Icons.GateArmgatealtopenIcon },
    ],
  },
  {
    label: 'Grid',
    icons: [
      { name: 'Outlined', component: Icons.GridOutlinedIcon },
      { name: 'Filled', component: Icons.GridFilledIcon },
    ],
  },
  {
    label: 'Hamburger Menu',
    icons: [
      { name: 'Menu', component: Icons.HamburgermenuMenuIcon },
      { name: 'Drag Handles', component: Icons.HamburgermenuDraghandlesIcon },
    ],
  },
  {
    label: 'Home',
    icons: [
      { name: 'Outlined', component: Icons.HomeOutlinedIcon },
      { name: 'Filled', component: Icons.HomeFilledIcon },
    ],
  },
  {
    label: 'Info',
    icons: [
      { name: 'Info Outlined', component: Icons.InfoInfoOutlinedIcon },
      { name: 'Info Filled', component: Icons.InfoInfoFilledIcon },
      { name: 'Warning Outlined', component: Icons.InfoWarningOutlinedIcon },
      { name: 'Warning Filled', component: Icons.InfoWarningFilledIcon },
      { name: 'Help Outlined', component: Icons.InfoHelpOutlinedIcon },
      { name: 'Help Filled', component: Icons.InfoHelpFilledIcon },
      { name: 'Event Outlined', component: Icons.InfoEventOutlinedIcon },
      { name: 'Event Filled', component: Icons.InfoEventFilledIcon },
      { name: 'Check Outlined', component: Icons.InfoCheckOutlinedIcon },
      { name: 'Check Filled', component: Icons.InfoCheckFilledIcon },
    ],
  },
  {
    label: 'Key',
    icons: [
      { name: 'Outlined', component: Icons.KeyOutlinedIcon },
      { name: 'Filled', component: Icons.KeyFilledIcon },
    ],
  },
  {
    label: 'Location',
    icons: [
      { name: 'Outlined', component: Icons.LocationOutlinedIcon },
      { name: 'Filled', component: Icons.LocationFilledIcon },
    ],
  },
  {
    label: 'Lock',
    icons: [
      { name: 'Rounded Locked', component: Icons.LockRoundedLockedIcon },
      { name: 'Rounded Unlocked', component: Icons.LockRoundedUnlockedIcon },
      { name: 'Rounded Disengaged', component: Icons.LockRoundedDisengagedIcon },
      { name: 'Flipped Unlocked', component: Icons.LockFlippedUnlockedIcon },
      { name: 'Square Locked', component: Icons.LockSquareLockedIcon },
      { name: 'Square Unlocked', component: Icons.LockSquareUnlockedIcon },
    ],
  },
  {
    label: 'Message',
    icons: [
      { name: 'Outlined', component: Icons.MessageOutlinedIcon },
      { name: 'Filled', component: Icons.MessageFilledIcon },
    ],
  },
  {
    label: 'People',
    icons: [
      { name: 'Outlined', component: Icons.PeopleOutlinedIcon },
      { name: 'Filled', component: Icons.PeopleFilledIcon },
    ],
  },
  {
    label: 'Search',
    icons: [{ name: 'Default', component: Icons.SearchDefaultIcon }],
  },
  {
    label: 'Settings',
    icons: [
      { name: 'Outlined', component: Icons.SettingsOutlinedIcon },
      { name: 'Filled', component: Icons.SettingsFilledIcon },
    ],
  },
  {
    label: 'Star',
    icons: [
      { name: 'Outlined', component: Icons.StarOutlinedIcon },
      { name: 'Filled', component: Icons.StarFilledIcon },
    ],
  },
  {
    label: 'User',
    icons: [
      { name: 'Outlined', component: Icons.UserOutlinedDefaultIcon },
      { name: 'Filled', component: Icons.UserFilledDefaultIcon },
      { name: 'Icon Add', component: Icons.UserIconAddIcon },
      { name: 'Icon Remove', component: Icons.UserIconRemoveIcon },
      { name: 'Icon Contacted', component: Icons.UserIconContactedIcon },
      { name: 'Icon Dealer', component: Icons.UserIconDealerIcon },
      { name: 'Icon Billing', component: Icons.UserIconBillingIcon },
      { name: 'Icon Billing Alt', component: Icons.UserIconBillingaltIcon },
      { name: 'Filled Add', component: Icons.UserFilledAddIcon },
      { name: 'Filled Remove', component: Icons.UserFilledRemoveIcon },
      { name: 'Filled Dealer', component: Icons.UserFilledDealerIcon },
      { name: 'Filled Billing', component: Icons.UserFilledBillingIcon },
    ],
  },
  {
    label: 'Video',
    icons: [
      { name: 'Outlined', component: Icons.VideoOutlinedIcon },
      { name: 'Outlined Disabled', component: Icons.VideoOutlinedDisabledIcon },
      { name: 'Filled', component: Icons.VideoFilledIcon },
      { name: 'Filled Disabled', component: Icons.VideoFilledDisabledIcon },
    ],
  },
  {
    label: 'Clock (Old)',
    icons: [
      { name: 'Outlined', component: Icons.ClockOldOutlinedIcon },
      { name: 'Filled', component: Icons.ClockOldFilledIcon },
    ],
  },
  {
    label: 'Comment',
    icons: [
      { name: 'Outlined', component: Icons.CommentOutlinedIcon },
      { name: 'Filled', component: Icons.CommentFilledIcon },
      { name: 'Color', component: Icons.CommentColorIcon },
    ],
  },
  {
    label: 'Commercial Door V3',
    icons: [{ name: 'Service Small', component: Icons.CommercialDoorV3ServiceSmallIcon }],
  },
  {
    label: 'Custom Sensor Active',
    icons: [{ name: 'Default', component: Icons.CustomSensorActiveDefaultIcon }],
  },
  {
    label: 'Dashboard (Old)',
    icons: [
      { name: 'Outlined', component: Icons.DashboadOldOutlineIcon },
      { name: 'Filled', component: Icons.DashboadOldFilledIcon },
    ],
  },
  {
    label: 'Dashboard 2',
    icons: [
      { name: 'Outlined', component: Icons.Dashboard2OutlinedIcon },
      { name: 'Filled', component: Icons.Dashboard2FilledIcon },
    ],
  },
  {
    label: 'Desktop',
    icons: [{ name: 'Default', component: Icons.DesktopDefaultIcon }],
  },
  {
    label: 'Device GDO',
    icons: [
      { name: 'Default', component: Icons.DevicegdoDefaultIcon },
      { name: 'Variant 2', component: Icons.DevicegdoVariant2Icon },
    ],
  },
  {
    label: 'Devices',
    icons: [
      { name: 'Phone', component: Icons.DevicesPhoneIcon },
      { name: 'SGC', component: Icons.DevicesSgcIcon },
      { name: 'Hub', component: Icons.DevicesHubIcon },
      { name: 'Lock', component: Icons.DevicesLockIcon },
      { name: 'GDO', component: Icons.DevicesGdoIcon },
      { name: 'Type 6', component: Icons.DevicesType6Icon },
    ],
  },
  {
    label: 'Dock Management',
    icons: [
      { name: 'Open', component: Icons.DockMgmtOpenIcon },
      { name: 'Fill', component: Icons.DockMgmtFillIcon },
      { name: 'Closed', component: Icons.DockMgmtClosedIcon },
      { name: 'Offline', component: Icons.DockMgmtOfflineIcon },
      { name: 'Dock Assigned', component: Icons.DockMgmtDockAssignedIcon },
      { name: 'Maintenance Needed', component: Icons.DockMgmtMaintainanceNeededIcon },
      { name: 'Inactive', component: Icons.DockMgmtInactiveIcon },
      { name: 'Bypass', component: Icons.DockMgmtBypassIcon },
      { name: 'Dock Number', component: Icons.DockMgmtDockNumberIcon },
    ],
  },
  {
    label: 'Facility',
    icons: [
      { name: 'Outlined', component: Icons.FacilityOutlinedIcon },
      { name: 'Filled', component: Icons.FacilityFilledIcon },
    ],
  },
  {
    label: 'Folder',
    icons: [
      { name: 'Outlined', component: Icons.FolderOutlinedIcon },
      { name: 'Filled', component: Icons.FolderFilledIcon },
    ],
  },
  {
    label: 'Toggle Up/Down',
    icons: [
      { name: 'Default', component: Icons.ToggleUpDownDefaultIcon },
      { name: 'Close', component: Icons.ToggleUpDownCloseIcon },
    ],
  },
  {
    label: 'Forklift Inactive',
    icons: [{ name: 'Inactive', component: Icons.ForkliftInactiveInactiveIcon }],
  },
  {
    label: 'GDO',
    icons: [
      { name: 'Closed Traditional', component: Icons.GdoClosedTraditionalDefaultIcon },
      { name: 'Opening 1 Traditional', component: Icons.GdoOpening1TraditionalDefaultIcon },
      { name: 'Opening 2 Traditional', component: Icons.GdoOpening2TraditionalDefaultIcon },
      { name: 'Open Traditional', component: Icons.GdoOpenTraditionalDefaultIcon },
      { name: 'Open Traditional Warning', component: Icons.GdoOpenTraditionalWarningIcon },
      { name: 'Offline Traditional', component: Icons.GdoOfflineTraditionalOfflineIcon },
      { name: 'Closed Modern', component: Icons.GdoClosedModernDefaultIcon },
      { name: 'Closed Modern Warning', component: Icons.GdoClosedModernWarningIcon },
      { name: 'Closed Modern Offline', component: Icons.GdoClosedModernOfflineIcon },
      { name: 'Open Modern', component: Icons.GdoOpenModernDefaultIcon },
    ],
  },
  {
    label: 'ID',
    icons: [{ name: 'Default', component: Icons.IdDefaultIcon }],
  },
  {
    label: 'Parking',
    icons: [
      { name: 'Parking Outlined', component: Icons.ParkingParkingOutlinedIcon },
      { name: 'Yard Outlined', component: Icons.ParkingYardOutlinedIcon },
    ],
  },
  {
    label: 'Heart',
    icons: [
      { name: 'Outlined', component: Icons.HeartOutlinedIcon },
      { name: 'Filled', component: Icons.HeartFilledIcon },
    ],
  },
  {
    label: 'History',
    icons: [{ name: 'Default', component: Icons.HistoryDefaultIcon }],
  },
  {
    label: 'Hourglass',
    icons: [{ name: 'Default', component: Icons.HourglassDefaultIcon }],
  },
  {
    label: 'Keypad',
    icons: [{ name: 'Default', component: Icons.KeypadDefaultIcon }],
  },
  {
    label: 'Hyperlink',
    icons: [{ name: 'Default', component: Icons.HyperlinkDefaultIcon }],
  },
  {
    label: 'Light',
    icons: [
      { name: 'Off', component: Icons.LightFalseIcon },
      { name: 'On', component: Icons.LightTrueIcon },
    ],
  },
  {
    label: 'Link',
    icons: [
      { name: 'Default', component: Icons.LinkDefaultIcon },
      { name: 'Variant 2', component: Icons.LinkVariant2Icon },
    ],
  },
  {
    label: 'List',
    icons: [{ name: 'Default', component: Icons.ListDefaultIcon }],
  },
  {
    label: 'Leveler',
    icons: [{ name: 'Default', component: Icons.LevelerDefaultIcon }],
  },
  {
    label: 'Lock Syncing',
    icons: [
      { name: 'Syncing', component: Icons.LockSyncingSyncingIcon },
      { name: 'Sync Error', component: Icons.LockSyncingSyncErrorIcon },
      { name: 'Variant 3', component: Icons.LockSyncingVariant3Icon },
      { name: 'Variant 4', component: Icons.LockSyncingVariant4Icon },
      { name: 'Variant 5', component: Icons.LockSyncingVariant5Icon },
      { name: 'Variant 6', component: Icons.LockSyncingVariant6Icon },
      { name: 'Variant 7', component: Icons.LockSyncingVariant7Icon },
    ],
  },
  {
    label: 'Mic',
    icons: [
      { name: 'Default Outlined', component: Icons.MicDefaultOutlinedIcon },
      { name: 'Muted Outlined', component: Icons.MicMutedOutlinedIcon },
      { name: 'Default Filled', component: Icons.MicDefaultFilledIcon },
      { name: 'Muted Filled', component: Icons.MicMutedFilledIcon },
    ],
  },
  {
    label: 'More',
    icons: [
      { name: 'Horizontal', component: Icons.MoreHorizontalIcon },
      { name: 'Vertical', component: Icons.MoreVerticalIcon },
    ],
  },
  {
    label: 'Motion',
    icons: [{ name: 'Default', component: Icons.MotionDefaultIcon }],
  },
  {
    label: 'Multi Select',
    icons: [
      { name: 'Outlined', component: Icons.MultiSelectOutlinedIcon },
      { name: 'Filled', component: Icons.MultiSelectFilledIcon },
    ],
  },
  {
    label: 'myQ',
    icons: [
      { name: 'Brand', component: Icons.MyQBrandIcon },
      { name: 'Icon', component: Icons.MyQIconDefaultIcon },
    ],
  },
  {
    label: 'Package',
    icons: [
      { name: 'Outlined', component: Icons.PackageOutlinedIcon },
      { name: 'Filled', component: Icons.PackageFilledIcon },
    ],
  },
  {
    label: 'Pallet',
    icons: [
      { name: 'Outlined', component: Icons.PalletOutlineIcon },
      { name: 'Filled', component: Icons.PalletFilledIcon },
    ],
  },
  {
    label: 'Partner',
    icons: [
      { name: 'Outlined', component: Icons.PartnerOutlinedIcon },
      { name: 'Filled', component: Icons.PartnerFilledIcon },
    ],
  },
  {
    label: 'Pet',
    icons: [
      { name: 'Outlined', component: Icons.PetOutlinedIcon },
      { name: 'Filled', component: Icons.PetFilledIcon },
    ],
  },
  {
    label: 'Pet Door',
    icons: [
      { name: 'Closed', component: Icons.PetDoorClosedIcon },
      { name: 'Open', component: Icons.PetDoorOpenIcon },
    ],
  },
  {
    label: 'Phone',
    icons: [
      { name: 'Outlined', component: Icons.PhoneOutlinedIcon },
      { name: 'Filled', component: Icons.PhoneFilledIcon },
    ],
  },
  {
    label: 'Photo',
    icons: [
      { name: 'Outlined', component: Icons.PhotoOutlinedIcon },
      { name: 'Filled', component: Icons.PhotoFilledIcon },
    ],
  },
  {
    label: 'Plane',
    icons: [
      { name: 'Outlined', component: Icons.PlaneOutlinedIcon },
      { name: 'Filled', component: Icons.PlaneFilledIcon },
    ],
  },
  {
    label: 'Play',
    icons: [
      { name: 'Play Outlined', component: Icons.PlayOutlinedPlayIcon },
      { name: 'Pause Outlined', component: Icons.PlayOutlinedPauseIcon },
      { name: 'Stop Outlined', component: Icons.PlayOutlinedStopIcon },
      { name: 'Play Filled', component: Icons.PlayFilledPlayIcon },
      { name: 'Pause Filled', component: Icons.PlayFilledPauseIcon },
      { name: 'Stop Filled', component: Icons.PlayFilledStopIcon },
    ],
  },
  {
    label: 'Pin',
    icons: [
      { name: 'Default', component: Icons.PinDefaultIcon },
      { name: 'Pinned', component: Icons.PinPinnedIcon },
    ],
  },
  {
    label: 'Pin (Old)',
    icons: [
      { name: 'Default', component: Icons.PinOldDefaultIcon },
      { name: 'Pinned', component: Icons.PinOldPinnedIcon },
    ],
  },
  {
    label: 'Plus / Minus',
    icons: [
      { name: 'Plus', component: Icons.PlusMinusPlusIcon },
      { name: 'Minus', component: Icons.PlusMinusMinusIcon },
    ],
  },
  {
    label: 'Power Off',
    icons: [{ name: 'Default', component: Icons.PowerOffDefaultIcon }],
  },
  {
    label: 'Preferences',
    icons: [
      { name: 'Outlined', component: Icons.PreferencesOutlinedIcon },
      { name: 'Filled', component: Icons.PreferencesFilledIcon },
    ],
  },
  {
    label: 'Privacy',
    icons: [
      { name: 'Outlined', component: Icons.PrivacyOutlinedIcon },
      { name: 'Filled', component: Icons.PrivacyFilledIcon },
    ],
  },
  {
    label: 'Reorder V3',
    icons: [
      { name: 'Default', component: Icons.ReorderV3DefaultIcon },
      { name: 'Default Columns', component: Icons.ReorderV3DefaultColumnsIcon },
      { name: 'Down', component: Icons.ReorderV3DownIcon },
      { name: 'Up', component: Icons.ReorderV3UpIcon },
      { name: 'A to Z', component: Icons.ReorderV3AToZIcon },
      { name: 'Z to A', component: Icons.ReorderV3ZToAIcon },
      { name: 'Long to Short', component: Icons.ReorderV3LongToShortIcon },
      { name: 'Short to Long', component: Icons.ReorderV3ShortToLongIcon },
      { name: 'Priority High', component: Icons.ReorderV3PriorityHighIcon },
      { name: 'Priority Low', component: Icons.ReorderV3PriorityLowIcon },
      { name: 'Time Descending', component: Icons.ReorderV3TimeDescendingIcon },
      { name: 'Time Ascending', component: Icons.ReorderV3TimeAscendingIcon },
    ],
  },
  {
    label: 'Reports',
    icons: [
      { name: 'Outlined', component: Icons.ReportsDefaultOutlinedIcon },
      { name: 'Variant 2 Outlined', component: Icons.ReportsVariant2OutlinedIcon },
      { name: 'Variant 3 Filled', component: Icons.ReportsVariant3FilledIcon },
      { name: 'Variant 4 Filled', component: Icons.ReportsVariant4FilledIcon },
    ],
  },
  {
    label: 'Reset',
    icons: [
      { name: 'Default', component: Icons.ResetDefaultIcon },
      { name: 'Sync', component: Icons.ResetSyncIcon },
    ],
  },
  {
    label: 'Reset (Old)',
    icons: [{ name: 'Default', component: Icons.ResetOldDefaultIcon }],
  },
  {
    label: 'Roles',
    icons: [
      { name: 'Outlined', component: Icons.RolesOutlinedIcon },
      { name: 'Filled', component: Icons.RolesFilledIcon },
    ],
  },
  {
    label: 'Separate Window',
    icons: [{ name: 'Default', component: Icons.SeparateWindowDefaultIcon }],
  },
  {
    label: 'Server',
    icons: [
      { name: 'Outlined', component: Icons.ServerOutlinedIcon },
      { name: 'Filled', component: Icons.ServerFilledIcon },
    ],
  },
  {
    label: 'Service',
    icons: [
      { name: 'Outlined', component: Icons.ServiceOutlinedIcon },
      { name: 'Filled', component: Icons.ServiceFilledIcon },
    ],
  },
  {
    label: 'Share',
    icons: [
      { name: 'iOS', component: Icons.ShareIosIcon },
      { name: 'Android', component: Icons.ShareAndroidIcon },
    ],
  },
  {
    label: 'Split View',
    icons: [
      { name: 'Fullscreen', component: Icons.SplitViewFullscreenIcon },
      { name: 'Sidebar', component: Icons.SplitViewSidebarIcon },
    ],
  },
  {
    label: 'Stopwatch',
    icons: [{ name: 'Default', component: Icons.StopwatchDefaultIcon }],
  },
  {
    label: 'Support',
    icons: [{ name: 'Default', component: Icons.SupportDefaultIcon }],
  },
  {
    label: 'Tag',
    icons: [
      { name: 'Default', component: Icons.TagDefaultIcon },
      { name: 'Filled', component: Icons.TagFilledIcon },
    ],
  },
  {
    label: 'Temperature',
    icons: [{ name: 'Default', component: Icons.TemperatureDefaultIcon }],
  },
  {
    label: 'Timezone',
    icons: [{ name: 'Default', component: Icons.TimezoneDefaultIcon }],
  },
  {
    label: 'Trailer',
    icons: [
      { name: 'Empty', component: Icons.TrailerEmptyIcon },
      { name: 'Reefer', component: Icons.TrailerReeferIcon },
      { name: 'Full', component: Icons.TrailerFullIcon },
      { name: 'Unloading', component: Icons.TrailerUnloadingIcon },
      { name: 'Long', component: Icons.TrailerLongIcon },
      { name: 'Filled', component: Icons.TrailerFilledIcon },
    ],
  },
  {
    label: 'Truck Present',
    icons: [
      { name: 'Default', component: Icons.TruckPresentDefaultIcon },
      { name: 'Checkout', component: Icons.TruckPresentCheckoutIcon },
      { name: 'Tractor', component: Icons.TruckPresentTractorIcon },
      { name: 'Cab', component: Icons.TruckPresentCabIcon },
      { name: 'Long', component: Icons.TruckPresentLongIcon },
    ],
  },
  {
    label: 'Video Screen',
    icons: [
      { name: 'Full', component: Icons.VideoScreenFullIcon },
      { name: 'Minimized', component: Icons.VideoScreenMinimizedIcon },
    ],
  },
  {
    label: 'View Switcher',
    icons: [{ name: 'Default', component: Icons.ViewSwitcherDefaultIcon }],
  },
  {
    label: 'Visibility',
    icons: [
      { name: 'On Outlined', component: Icons.VisibilityOnOutlinedIcon },
      { name: 'Off Outlined', component: Icons.VisibilityOffOutlinedIcon },
      { name: 'On Filled', component: Icons.VisibilityOnFilledIcon },
      { name: 'Off Filled', component: Icons.VisibilityOffFilledIcon },
    ],
  },
  {
    label: 'Volume',
    icons: [
      { name: 'High Outlined', component: Icons.VolumeHighOutlinedIcon },
      { name: 'Low Outlined', component: Icons.VolumeLowOutlinedIcon },
      { name: 'Off Outlined', component: Icons.VolumeOffOutlinedIcon },
      { name: 'Muted Outlined', component: Icons.VolumeMutedOutlinedIcon },
      { name: 'High Filled', component: Icons.VolumeHighFilledIcon },
      { name: 'Low Filled', component: Icons.VolumeLowFilledIcon },
      { name: 'Off Filled', component: Icons.VolumeOffFilledIcon },
      { name: 'Muted Filled', component: Icons.VolumeMutedFilledIcon },
    ],
  },
  {
    label: 'Wall Control',
    icons: [
      { name: 'Default', component: Icons.WallControlDefaultIcon },
      { name: 'Error', component: Icons.WallControlErrorIcon },
    ],
  },
  {
    label: 'Welcome',
    icons: [
      { name: 'Outlined', component: Icons.WelcomeOutlinedIcon },
      { name: 'Filled', component: Icons.WelcomeFilledIcon },
    ],
  },
  {
    label: 'WiFi',
    icons: [
      { name: '4 Bars', component: Icons.WifiOffline4Icon },
      { name: '3 Bars', component: Icons.WifiOffline3Icon },
      { name: '2 Bars', component: Icons.WifiOffline2Icon },
      { name: '1 Bar', component: Icons.WifiOffline1Icon },
      { name: 'Offline', component: Icons.WifiOfflineIcon },
    ],
  },
  {
    label: 'Works With',
    icons: [
      { name: 'Outlined', component: Icons.WorksWithOutlinedIcon },
      { name: 'Filled', component: Icons.WorksWithFilledIcon },
    ],
  },
];

const ICON_SIZES = [16, 20, 24, 32, 40];

export function IconsShowcase() {
  const [size, setSize] = useState(24);
  const [color, setColor] = useState('#191919');
  const [search, setSearch] = useState('');

  const filteredGroups = ICON_GROUPS.filter((group) =>
    group.label.toLowerCase().includes(search.toLowerCase()) ||
    group.icons.some((icon) => icon.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ padding: '32px 40px', maxWidth: 1200 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: '#17191c' }}>
        Icons
      </h2>
      <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 28, lineHeight: 1.5 }}>
        363 inline SVG icons from the 4.0 Enterprise Design System. All icons use{' '}
        <code style={{ background: '#f3f4f6', padding: '1px 5px', borderRadius: 4, fontSize: 12 }}>
          currentColor
        </code>{' '}
        and accept <code style={{ background: '#f3f4f6', padding: '1px 5px', borderRadius: 4, fontSize: 12 }}>size</code>,{' '}
        <code style={{ background: '#f3f4f6', padding: '1px 5px', borderRadius: 4, fontSize: 12 }}>color</code>,{' '}
        <code style={{ background: '#f3f4f6', padding: '1px 5px', borderRadius: 4, fontSize: 12 }}>className</code>, and{' '}
        <code style={{ background: '#f3f4f6', padding: '1px 5px', borderRadius: 4, fontSize: 12 }}>style</code> props.
      </p>

      {/* Controls */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16,
          alignItems: 'center',
          padding: '16px 20px',
          background: '#f9fafb',
          borderRadius: 10,
          marginBottom: 32,
          border: '1px solid #e5e7eb',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>Size:</label>
          <div style={{ display: 'flex', gap: 4 }}>
            {ICON_SIZES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                style={{
                  padding: '4px 10px',
                  borderRadius: 6,
                  border: size === s ? '2px solid #172dbd' : '1px solid #d1d5db',
                  background: size === s ? '#e0ebff' : '#fff',
                  fontSize: 13,
                  fontWeight: size === s ? 600 : 400,
                  cursor: 'pointer',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>Color:</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{ width: 36, height: 28, borderRadius: 4, border: '1px solid #d1d5db', cursor: 'pointer', padding: 2 }}
          />
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{
              width: 90,
              padding: '4px 8px',
              border: '1px solid #d1d5db',
              borderRadius: 6,
              fontSize: 13,
              fontFamily: 'monospace',
            }}
          />
        </div>

        <div style={{ marginLeft: 'auto' }}>
          <input
            type="text"
            placeholder="Search icons…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: '7px 12px',
              border: '1px solid #d1d5db',
              borderRadius: 8,
              fontSize: 14,
              width: 200,
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Icon groups */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {filteredGroups.map((group) => (
          <section key={group.label}>
            <h3
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: 12,
                paddingBottom: 6,
                borderBottom: '1px solid #f3f4f6',
              }}
            >
              {group.label}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {group.icons.map(({ name, component: Icon }) => (
                <div
                  key={name}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                    padding: '12px 10px',
                    width: 96,
                    borderRadius: 8,
                    border: '1px solid #e5e7eb',
                    background: '#fff',
                    cursor: 'default',
                    transition: 'box-shadow 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                    (e.currentTarget as HTMLDivElement).style.borderColor = '#d1d5db';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                    (e.currentTarget as HTMLDivElement).style.borderColor = '#e5e7eb';
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      color,
                    }}
                  >
                    <Icon size={size} />
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      color: '#6b7280',
                      textAlign: 'center',
                      lineHeight: 1.3,
                      wordBreak: 'break-word',
                    }}
                  >
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}

        {filteredGroups.length === 0 && (
          <div style={{ padding: 40, textAlign: 'center', color: '#9ca3af', fontSize: 15 }}>
            No icons match &ldquo;{search}&rdquo;
          </div>
        )}
      </div>
    </div>
  );
}
