import { RootLayout } from '@layouts/rootLayout';

import { DiaryEditPage } from '@pages/diaryEditPage';
import { DiaryPage } from '@pages/diaryPage';
import { DiaryWritePage } from '@pages/diaryWritePage';
import { ErrorPage } from '@pages/errorPage';
import { LoginPage } from '@pages/loginPage';
import { LogoutPage } from '@pages/logoutPage';
import { MyBoardPage } from '@pages/myBoardPage';
import { NotFoundPage } from '@pages/notFoundPage';
import { NotificationPage } from '@pages/notificationPage';
import { OnBoardingPage } from '@pages/onBoardingPage';
import { SettingCloudPage } from '@pages/settingCloudPage';
import { SettingFeedbackPage } from '@pages/settingFeedbackPage';
import { SettingFontPage } from '@pages/settingFontPage';
import { SettingPage } from '@pages/settingPage';
import { SettingProfilePage } from '@pages/settingProfilePage';

import type { RouteObject } from 'react-router-dom';

export const routes = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'logout',
            element: <LogoutPage />,
          },
          {
            path: 'onboarding',
            element: <OnBoardingPage />,
          },
          {
            path: 'myboard',
            element: <MyBoardPage />,
          },
          {
            path: 'myboard/:boardId',
            element: <DiaryPage />,
          },
          {
            path: 'myboard/:boardId/edit',
            element: <DiaryEditPage />,
          },
          {
            path: 'myboard/:boardId/write',
            element: <DiaryWritePage />,
          },
          {
            path: 'myboard/:boardId/:diaryId/comment',
            element: <DiaryPage />,
          },
          {
            path: 'myboard/:boardId/:diaryId/gallery',
            element: <DiaryPage />,
          },
          {
            path: 'notification',
            element: <NotificationPage />,
          },
          {
            path: 'setting',
            element: <SettingPage />,
          },
          {
            path: 'setting/profile',
            element: <SettingProfilePage />,
          },
          {
            path: 'setting/font',
            element: <SettingFontPage />,
          },
          {
            path: 'setting/cloud',
            element: <SettingCloudPage />,
          },
          {
            path: 'setting/feedback',
            element: <SettingFeedbackPage />,
          },
          {
            path: '*',
            element: <NotFoundPage />,
          },
        ],
      },
    ],
  },
] as RouteObject[];
