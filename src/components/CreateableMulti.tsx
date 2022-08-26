import React, { Component } from 'react';

import CreatableSelect from 'react-select/creatable';
import { ActionMeta, OnChangeValue } from 'react-select';
import { ColourOption, colourOptions } from '@/utils/data';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'blue',
    padding: 20,
  }),
  control: (provided) => ({
    ...provided,
    // none of react-select's styles are passed to <Control />
    // width: 200,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}

export default class CreatableMulti extends Component<{}> {
  handleChange = (
    newValue: OnChangeValue<ColourOption, true>,
    actionMeta: ActionMeta<ColourOption>
  ) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  render() {
    return (
      <CreatableSelect
        isMulti
        styles={customStyles}
        onChange={this.handleChange}
        options={colourOptions}
        closeMenuOnSelect={false}
        components={animatedComponents}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: '#dda15e',
            primary: 'black',
          },
        })}
        defaultValue={[colourOptions[4], colourOptions[5]]}
      />
    );
  }
}
