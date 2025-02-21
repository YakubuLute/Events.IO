
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

import styles from './multipleSelectChip.module.scss';

interface SelectChipProps {
  label: string;
  options: { id?: number, name: string }[]; //  options: Array<MenuOption>,
  selectedItems: string[];
  searchFieldPlaceholder?: string,
  onChange: (event: SelectChangeEvent<string[]>) => void;
  onChipDelete?: (itemToDelete: string) => void;
  selectClass?: string;
  chipClass?: string;
}

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 214,
      width: 250,
    },
  },
};

export const MultipleSelectChip: React.FC<SelectChipProps> = (props) => {
  const { label, selectedItems, options, onChange, onChipDelete, chipClass } = props;

  return (
    <div>
      <FormControl fullWidth>
        {/* {label && <InputLabel id={label + "-multiple-chip-label"}>{label}</InputLabel>} */}
        <Select
          className={styles.select_chip_form}
          labelId={label + "-multiple-chip-label"}
          id="demo-multiple-chip"
          multiple
          value={selectedItems ? selectedItems : []}
          onChange={onChange}
          // input={<OutlinedInput id="select-multiple-chip" label={label} />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }} className={chipClass && styles[chipClass]} >
              {selected.map((value: string) => (
                <Chip
                  key={value}
                  label={value}
                  className={styles.chip_item}
                  onDelete={onChipDelete ? () => onChipDelete(value) : undefined}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {options && options.map((option) => (
            <MenuItem
              key={option.id ? option.id : option.name}
              value={option.name}
              classes={{ selected: styles.selectedItem, root: styles.menuItem, focusVisible: styles.focusItem}}
            >
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}