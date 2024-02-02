import { MyboardLayout } from '@Layouts/MyboardLayout';
import { RootLayout } from '@Layouts/RootLayout';
import { DiaryAllPage } from '@Pages/DiaryAllPage';
import { DiaryCalendarPage } from '@Pages/DiaryCalendarPage';

import { DiaryEditPage } from '@Pages/DiaryEditPage';
import { DiaryNewPage } from '@Pages/DiaryNewPage';
import { DiaryWritePage } from '@Pages/DiaryWritePage';
import { ErrorPage } from '@Pages/ErrorPage';
import { LoginPage } from '@Pages/LoginPage';
import { LogoutPage } from '@Pages/LogoutPage';
import { MyBoardPage } from '@Pages/MyBoardPage';
import { NotFoundPage } from '@Pages/NotFoundPage';
import { NotificationPage } from '@Pages/NotificationPage';
import { OnBoardingPage } from '@Pages/OnBoardingPage';
import { SettingCloudPage } from '@Pages/SettingCloudPage';
import { SettingFeedbackPage } from '@Pages/SettingFeedbackPage';
import { SettingFontPage } from '@Pages/SettingFontPage';
import { SettingPage } from '@Pages/SettingPage';
import { SettingProfilePage } from '@Pages/SettingProfilePage';

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
            element: <MyboardLayout />,
            children: [
              {
                path: 'myboard/:boardId/calendar',
                element: <DiaryCalendarPage />,
              },
              {
                path: 'myboard/:boardId/new',
                element: <DiaryNewPage />,
              },
              {
                path: 'myboard/:boardId/all',
                element: <DiaryAllPage />,
              },
            ],
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
