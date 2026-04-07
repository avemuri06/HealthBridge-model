import { createBrowserRouter } from "react-router";
import { LoginRegister } from "./components/LoginRegister";
import { ForgotPassword } from "./components/ForgotPassword";
import { ForgotUsername } from "./components/ForgotUsername";
import { FAQ } from "./components/FAQ";
import { Pricing } from "./components/Pricing";
import { Home } from "./components/Home";
import { Appointments } from "./components/Appointments";
import { SymptomCheckIn } from "./components/SymptomCheckIn";
import { HealthRecords } from "./components/HealthRecords";
import { Messages } from "./components/Messages";
import { ProfileSettings } from "./components/ProfileSettings";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginRegister,
  },
  {
    path: "/home",
    Component: Home,
  },
  {
    path: "/appointments",
    Component: Appointments,
  },
  {
    path: "/symptom-check-in",
    Component: SymptomCheckIn,
  },
  {
    path: "/health-records",
    Component: HealthRecords,
  },
  {
    path: "/messages",
    Component: Messages,
  },
  {
    path: "/forgot-password",
    Component: ForgotPassword,
  },
  {
    path: "/forgot-username",
    Component: ForgotUsername,
  },
  {
    path: "/faq",
    Component: FAQ,
  },
  {
    path: "/pricing",
    Component: Pricing,
  },
  {
    path: "/profile-settings",
    Component: ProfileSettings,
  },
]);