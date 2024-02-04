import { Calendar } from '@Components/Calendar';
import styles from './DiaryCalendarPage.module.scss';
import { useRecoilState } from 'recoil';
import { selectedDateStore } from '@Store/index';
import { useGetTodayDiary } from '@Hooks/NetworkHooks';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DiaryItem } from '@Components/DiaryItem';

export const diaryList = [
  {
    id: '30',
    member: {
      id: '1',
      nickname: '이세은',
    },
    boardId: '2',
    emotionId: '5',
    thumbnailUrl: 'http://k.kakaocdn.net/dn/baBXJ9/btsBioRV2JX/D5PkxboyB3GlyezTE9hja0/img_640x640.jpg',
    likeCount: '99',
    commentCount: '12',
    selectedDate: '2024-01-13T00:00:00',
    timeStamp: '3분전',
    title: '쿠킹 클래스 첫번째 수업 - 쌀국수 만들기',
  },
  {
    id: '22',
    member: {
      id: '1',
      nickname: '권동휘',
    },
    boardId: '2',
    emotionId: '5',
    thumbnailUrl: '',
    likeCount: '99',
    commentCount: '12',
    selectedDate: '2024-01-13T00:00:00',
    timeStamp: '3분전',
    title: '오늘의 일기',
  },
  {
    id: '12',
    member: {
      id: '1',
      nickname: '김범준',
    },
    boardId: '2',
    emotionId: '5',
    thumbnailUrl: 'http://k.kakaocdn.net/dn/baBXJ9/btsBioRV2JX/D5PkxboyB3GlyezTE9hja0/img_640x640.jpg',
    likeCount: '99',
    commentCount: '12',
    selectedDate: '2024-01-13T00:00:00',
    timeStamp: '3분전',
    title: '오늘의 일기',
  },
];

export const DiaryCalendarPage = () => {
  const selectedDate = useRecoilState(selectedDateStore);
  const { date } = selectedDate[0];

  const location = useLocation();
  const boardId = location.pathname.split('/')[3];
  const formatDate = (num: number) => (num > 9 ? num : `0${num}`);
  const dateStr = `${date.getFullYear()}-${formatDate(date.getMonth() + 1)}-${formatDate(date.getDate())}`;

  const {
    mutate: getTodayDiaryMutation,
    isSuccess,
    isError,
    data: todayData,
  } = useGetTodayDiary(Number(boardId), dateStr);

  useEffect(() => {
    getTodayDiaryMutation();
  }, [dateStr]);

  isSuccess && console.log('todayData', todayData, todayData?.length);

  return (
    <div className={styles.container}>
      <Calendar />
      <div className={styles.content}>
        <h1>
          {formatDate(date.getMonth() + 1)}월 {formatDate(date.getDate())}일 일기
        </h1>

        {isError && <div>일기 목록을 불러오는데 실패했습니다</div>}
        {!isError && <p>총 {todayData?.length}개의 일기가 있습니다.</p>}
        {/* TODO: API 정상적으로 연결되면 주석 해제 */}
        {/* {todayData?.length === 0 ? (
          <div>일기를 작성해주세요.</div>
        ) : (
          todayData.map((diary) => <DiaryItem key={diary.id} diary={diary} />)
        )} */}
      </div>
    </div>
  );
};
