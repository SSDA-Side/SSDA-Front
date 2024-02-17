import { PropsWithChildren, createContext, useContext, useReducer } from 'react';

type WriteFormDate = {
  boardId: string;
  diaryTitle: string;
  contents: string;
  stickerId: string;
  diaryDate: string;
  diaryImgs: FileList | null;
};

const initialFormData: WriteFormDate = {
  boardId: '-1',
  diaryTitle: '',
  contents: '',
  stickerId: '0',
  diaryDate: '',
  diaryImgs: null,
};

type WriteAction = {
  type: string;
  payload: Partial<WriteFormDate>;
};

const FormDataContext = createContext<WriteFormDate | null>(null);
const FormDataDispatchContext = createContext<React.Dispatch<WriteAction> | null>(null);

const formDataReducer = (state: WriteFormDate, action: WriteAction) => {
  switch (action.type) {
    case 'updateFields': {
      return { ...state, ...action.payload };
    }

    default: {
      return state;
    }
  }
};

export const FormDataContextProvider = ({ children }: PropsWithChildren) => {
  const [formData, dispatch] = useReducer(formDataReducer, initialFormData);

  return (
    <FormDataContext.Provider value={formData}>
      <FormDataDispatchContext.Provider value={dispatch}>{children}</FormDataDispatchContext.Provider>
    </FormDataContext.Provider>
  );
};

export const useFormDataState = () => {
  const context = useContext(FormDataContext);

  if (context === null) {
    throw new Error('never but for type-guard');
  }

  return context;
};

export const useFormDataDispatch = () => {
  const context = useContext(FormDataDispatchContext);

  if (context === null) {
    throw new Error('never but for type-guard');
  }

  return context;
};

export const useFormData = () => {
  const dispatch = useFormDataDispatch();

  const updateBoardId = (boardId: string) =>
    dispatch({
      type: 'updateFields',
      payload: { boardId },
    });

  const updateDiaryDate = (diaryDate: string) =>
    dispatch({
      type: 'updateFields',
      payload: { diaryDate },
    });

  const updateEmotionId = (stickerId: string) =>
    dispatch({
      type: 'updateFields',
      payload: { stickerId },
    });

  const updateTitle = (diaryTitle: string) =>
    dispatch({
      type: 'updateFields',
      payload: { diaryTitle },
    });

  const updateContents = (contents: string) =>
    dispatch({
      type: 'updateFields',
      payload: { contents },
    });

  const updateImages = (diaryImgs: FileList) =>
    dispatch({
      type: 'updateFields',
      payload: { diaryImgs },
    });

  return { updateBoardId, updateDiaryDate, updateEmotionId, updateTitle, updateContents, updateImages };
};
