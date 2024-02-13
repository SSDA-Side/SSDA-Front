import { BottomSheetProps, BottomSheetType, SheetStore } from '@Store/SheetShore';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { v4 as uuid } from 'uuid';

export const useSheet = () => {
  const bottomSheet = useRecoilValue(SheetStore);

  const openBottomSheet = useRecoilCallback(
    ({ set }) =>
      <T extends BottomSheetProps>(sheetMetadata: Omit<BottomSheetType<T>, 'id' | 'isOpened'>) => {
        const newId = uuid();

        set(SheetStore, {
          id: uuid(),
          isOpened: true,
          ...sheetMetadata,
        });

        return newId;
      },
    [],
  );

  const closeBottomSheet = useRecoilCallback(
    ({ set }) =>
      () => {
        set(SheetStore, {} as BottomSheetType);
      },
    [],
  );

  return { bottomSheet, openBottomSheet, closeBottomSheet };
};
