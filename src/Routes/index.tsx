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
import { ProtectedRouter } from './ProtectedRouter';
import { SharePage, loader as shareLoader } from '@Pages/SharePage';
import { BoardSignUpPage } from '@Pages/BoardSignUpPage';
import { SettingLayout } from '@Layouts/SettingLayout';
import { DiaryListPage } from '@Pages/DiaryListPage';
import { GlobalLayout } from '@Layouts/GlobalLayout';
import { OauthPage } from '@Pages/OauthPage';

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
            path: '/',
            element: <LoginPage />,
          },
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'oauth/callback/kakao',
            element: <OauthPage />,
          },
          {
            path: 'logout',
            element: <LogoutPage />,
          },
          {
            path: 'share',
            loader: shareLoader,
            element: <SharePage />,
          },
          {
            path: 'signup_board',
            element: <BoardSignUpPage />,
          },
          {
            path: '*',
            element: <NotFoundPage />,
          },
          {
            element: <ProtectedRouter />,
            children: [
              {
                element: <GlobalLayout />,
                children: [
                  {
                    path: 'onboarding',
                    element: <OnBoardingPage />,
                  },
                  {
                    element: <MyboardLayout />,
                    children: [
                      {
                        path: 'myboard/calendar/:boardId',
                        element: <DiaryCalendarPage />,
                      },
                      {
                        path: 'myboard/new/:boardId',
                        element: <DiaryNewPage />,
                      },
                      {
                        path: 'myboard/all/:boardId',
                        element: <DiaryAllPage />,
                      },
                    ],
                  },
                  {
                    path: 'myboard/:boardId/:date',
                    element: <DiaryListPage />,
                  },
                  {
                    path: 'myboard',
                    element: <MyBoardPage />,
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
                    element: <SettingLayout />,
                    children: [
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
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
] as RouteObject[];
