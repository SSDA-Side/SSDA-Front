import { RootLayout } from '@Layouts/RootLayout';
import { SettingLayout } from '@Layouts/SettingLayout';
import { TabLayout } from '@Layouts/TabLayout';
import { BoardSignUpPage } from '@Pages/BoardSignUpPage';
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
import { OauthPage } from '@Pages/OauthPage';
import { SettingCloudPage } from '@Pages/SettingCloudPage';
import { SettingFeedbackPage } from '@Pages/SettingFeedbackPage';
import { SettingFontPage } from '@Pages/SettingFontPage';
import { SettingPage } from '@Pages/SettingPage';
import { SettingProfilePage } from '@Pages/SettingProfilePage';
import { SharePage, loader as shareLoader } from '@Pages/SharePage';
import type { RouteObject } from 'react-router-dom';
import { ProtectedRouter } from './ProtectedRouter';

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
            element: <ProtectedRouter />,
            children: [
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
                path: 'myboard/:boardId',
                element: <TabLayout />,
                children: [
                  {
                    path: 'calendar',
                    element: <DiaryCalendarPage />,
                  },
                  {
                    path: 'all',
                    element: <DiaryAllPage />,
                  },
                  {
                    path: 'new',
                    element: <DiaryNewPage />,
                  },
                ],
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
          {
            path: '*',
            element: <NotFoundPage />,
          },
        ],
      },
    ],
  },
] as RouteObject[];
