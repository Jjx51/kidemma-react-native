import { ImageSelector, ImageSelectorOption } from '@components';
import { ParentRole } from '@kdTypes';

const ROLES: ImageSelectorOption<ParentRole>[] = [
  {
    value: ParentRole.Mom,
    label: 'Mamá',
    source: require('@assets/images/mother.png'),
  },
  {
    value: ParentRole.Dad,
    label: 'Papá',
    source: require('@assets/images/father.png'),
  },
  {
    value: ParentRole.Other,
    label: 'Otro',
    source: require('@assets/images/other.png'),
  },
];

interface RoleSelectorProps {
  selected: ParentRole;
  onChange: (role: ParentRole) => void;
}

export function RoleSelector({ selected, onChange }: RoleSelectorProps) {
  return (
    <ImageSelector options={ROLES} selected={selected} onChange={onChange} />
  );
}
