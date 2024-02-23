import { DiaryFormData } from '@Type/Request';
import { PropsWithChildren, createContext, useContext, useReducer } from 'react';

const initialFormData: DiaryFormData = {
  boardId: -1,
  title: '',
  contents: '',
  emotionId: 1,
  selectedDate: new Date().toISOString(),
  images: [] as File[],
};

type WriteAction = {
  type: string;
  payload: Partial<DiaryFormData>;
};

const FormDataContext = createContext<DiaryFormData | null>(null);
const FormDataDispatchContext = createContext<React.Dispatch<WriteAction> | null>(null);

const formDataReducer = (state: DiaryFormData, action: WriteAction) => {
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
  const currentFormData = useFormDataState();
  const dispatch = useFormDataDispatch();

  const updateBoardId = (boardId: number) =>
    dispatch({
      type: 'updateFields',
      payload: { boardId },
    });

  const updateSelectedDate = (selectedDate: string) =>
    dispatch({
      type: 'updateFields',
      payload: { selectedDate },
    });

  const updateEmotionId = (emotionId: number) =>
    dispatch({
      type: 'updateFields',
      payload: { emotionId },
    });

  const updateTitle = (title: string) =>
    dispatch({
      type: 'updateFields',
      payload: { title },
    });

  const updateContents = (contents: string) =>
    dispatch({
      type: 'updateFields',
      payload: { contents },
    });

  const updateImages = (images: File[]) =>
    dispatch({
      type: 'updateFields',
      payload: { images: [...(currentFormData.images || []), ...images] },
    });

  const deleteImage = (targetFile: File) => {
    dispatch({
      type: 'updateFields',
      payload: {
        images: [...Array.from(currentFormData.images || []).filter((file) => file.name !== targetFile.name)],
      },
    });
  };

  return { updateBoardId, updateSelectedDate, updateEmotionId, updateTitle, updateContents, updateImages, deleteImage };
};
