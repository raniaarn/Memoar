import { Flex, Stack, Heading, FormControl, Input, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react"
import { useState } from "react"
import { useMutation } from "@/components"
import toast from 'react-hot-toast';
import Cookies from 'js-cookie'
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const LayoutComponent = dynamic(
  () => import('@/components/Layout').then(mod => mod.Layout)
);

export default function Login() {
  const { mutate } = useMutation()
  const router = useRouter()
  const [payload, setPayload] = useState({
    email: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    const response = await mutate({
      prefixUrl: `${process.env.NEXT_PUBLIC_API}/api/login`,
      payload,
    })

    if (!response?.result?.success) {
      toast.error("Login Gagal")
    } else {
      Cookies.set('user_token',
        response?.result?.data?.token,
        {
          expires: new Date(response?.result?.data?.expires_at),
          path: "/"
        })
      toast.success("Berhasil Login!")
    }
    router.push('/');
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <LayoutComponent metaTitle="Login" metaDescription="Join Memoar">
      <div className="mx-auto my-auto h-screen flex flex-col justify-center items-center">

        <Flex alignItems="center" justifyContent="center">
          <Stack direction="column" spacing={4} alignItems="center" justifyContent="center">
            <Heading as="h4" color="#0C50FF">
              Login
            </Heading>
            <FormControl>
              <Input
                value={payload?.email}
                onChange={(event) => setPayload({ ...payload, email: event.target.value })}
                placeholder="email"
              />
            </FormControl>
            <FormControl>
              <InputGroup>
                <Input
                  value={payload?.password}
                  onChange={(event) => setPayload({ ...payload, password: event.target.value })}
                  placeholder="password"
                  type={showPassword ? 'text' : 'password'}
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={handleTogglePasswordVisibility}
                    variant="ghost"
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl alignItems="center" justifyContent="center">
              <button
                className="w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-900 rounded-md justify-center items-center text-white text-sm"
                onClick={() => handleSubmit()}>
                Login
              </button>
            </FormControl>
            <div>
              Do you have account?
              <span className="font-bold">
                <Link href="/register"> Register Now
                </Link>
              </span>
            </div>
          </Stack>
        </Flex>
        </div>
    </LayoutComponent>
  )
}