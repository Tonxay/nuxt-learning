// composables/useUsers.ts
interface User {
  id: number;
  createdAt: string;
  name: number;
  avatar: string;
}

export const useUsers = () => {
  const users = useState<User[] | null>("users", () => null);
  const loading = useState("usersLoading", () => false);
  const error = useState<Error | null>("usersError", () => null);

  const fetchUsers = async () => {
    loading.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } = await useFetch<User[]>(
        "https://6810974b27f2fdac2411f78a.mockapi.io/b"
      );

      if (fetchError.value) throw fetchError.value;
      users.value = data.value;
      console.log("Fetched users:", users.value);
    } catch (err: any) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return { users, loading, error, fetchUsers };
};
