// TODO: 시멘틱하게 갈 건지? 그냥 버튼 처리로 할지?

/** React */
import { createContext, useContext, useState, type PropsWithChildren } from 'react';

/** Style */
import styles from './AppearanceRadio.module.scss';

/** Component */
import { Typography } from '@Components/Common/Typography';

/** Util */
import cn from 'classnames';

/** Const */
const RadioContext = createContext<[number, (id: number) => void] | null>(null);

const useRadioContext = () => {
  const context = useContext(RadioContext);

  if (context === null) {
    throw new Error('RadioContext가 비었어요'); // never but for type-guard
  }

  return context;
};

type AppeaeranceRadioProp = PropsWithChildren<{
  defaultValue: number;
  onValueChange: (newValue: number) => void;
}>;

const AppearanceRadio = ({ defaultValue, onValueChange, children }: AppeaeranceRadioProp) => {
  const [selectedId, setSelectedId] = useState(defaultValue);

  const updateSelectedId = (newId: number) => {
    setSelectedId(newId);
    onValueChange(newId);
  };

  return (
    <RadioContext.Provider value={[selectedId, updateSelectedId]}>
      <div className={styles.radioGroup}>{children}</div>
    </RadioContext.Provider>
  );
};

type ItemProp = { value: string; id: number };
const Item = ({ value, id }: ItemProp) => {
  const [selectedId, updateSelectedId] = useRadioContext();

  return (
    <button
      className={cn(styles.radioButton, { [styles.radioSelected]: selectedId === id })}
      onClick={() => updateSelectedId(id)}
    >
      <Typography as="button">{value}</Typography>
    </button>
  );
};

AppearanceRadio.Item = Item;

export { AppearanceRadio };
