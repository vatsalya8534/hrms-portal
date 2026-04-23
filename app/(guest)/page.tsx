
import  LoginForm  from "./login-form";

export default async function LoginPage() {

    return (
        <div className="min-h-screen grid lg:grid-cols-2">

            {/* LEFT SIDE */}
            <div className="hidden lg:flex flex-col justify-between p-12 text-white bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#2563eb]">
                {/* Top */}
                <div>
                    <p className="text-xs tracking-widest opacity-80">
                        HRMS PLATFORM
                    </p>

                    <h1 className="text-2xl font-semibold mt-2">
                        YOUR COMPANY
                    </h1>
                </div>

                {/* Center */}
                <div className="max-w-lg">
                    <p className="text-sm uppercase tracking-widest opacity-70 mb-4">
                        Welcome Back
                    </p>

                    <h2 className="text-5xl font-semibold leading-tight mb-6">
                        Manage employees, payroll, and operations from one place.
                    </h2>

                    <p className="text-sm opacity-80">
                        Access attendance, employee records, payroll insights, and project
                        tracking in a single HRMS dashboard.
                    </p>

                    {/* Feature Cards */}
                    <div className="flex gap-4 mt-10">

                        <div className="bg-white/10 backdrop-blur p-4 rounded-xl w-40">
                            <p className="font-semibold">Employees</p>
                            <p className="text-xs opacity-80 mt-1">
                                Manage workforce data
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur p-4 rounded-xl w-40">
                            <p className="font-semibold">Payroll</p>
                            <p className="text-xs opacity-80 mt-1">
                                Salary & compliance
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur p-4 rounded-xl w-40">
                            <p className="font-semibold">Projects</p>
                            <p className="text-xs opacity-80 mt-1">
                                Resource allocation
                            </p>
                        </div>

                    </div>
                </div>

                {/* Bottom */}
                <p className="text-xs opacity-70">
                    © {new Date().getFullYear()} YOUR COMPANY
                </p>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center justify-center bg-gray-50 p-6">

                <div className="w-full max-w-md">

                    {/* Heading */}
                    <div className="mb-6">
                        <p className="text-xs tracking-widest text-blue-600 font-medium">
                            SIGN IN
                        </p>

                        <h2 className="text-3xl font-semibold text-gray-900 mt-2">
                            Continue to your dashboard
                        </h2>

                        <p className="text-sm text-gray-500 mt-2">
                            Login to access HRMS system and manage your organization.
                        </p>
                    </div>

                    {/* Card */}
                    <div className="bg-white border rounded-2xl shadow-sm p-6">

                        <h3 className="text-center font-semibold text-lg mb-1">
                            HRMS PORTAL
                        </h3>

                        <p className="text-center text-sm text-gray-500 mb-6">
                            Secure login for authorized users
                        </p>

                        {/* FORM */}
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    );
}