import React, { Component } from 'react';

import CreatableSelect from 'react-select/creatable';
import { ActionMeta, OnChangeValue } from 'react-select';
import makeAnimated from 'react-select/animated';
import { genreOptions, GenreOption } from '../utils/data';

const animatedComponents = makeAnimated();

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted gray',
    color: state.isSelected ? 'red' : 'black',
    padding: 12,
  }),
  control: (provided) => ({
    ...provided,
    // none of react-select's styles are passed to <Control />
    // width: 200,
  }),
  input: (styles) => ({ ...styles, }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}


export default class CreatableMulti extends Component<{}> {
  handleChange = (
    newValue: OnChangeValue<GenreOption, true>,
    actionMeta: ActionMeta<GenreOption>
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
        options={genreOptions}
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
        defaultValue={[genreOptions[0], genreOptions[1]]}
      />
    );
  }
}
