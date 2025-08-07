import Breadcrumbs from "@/components/custome/Breadcrumbs"
import ActionButton from "@/components/custome/table/ActionButton"
import ActionLink from "@/components/custome/table/ActionLink"
import Pagination from "@/components/custome/table/Pagination"
import TableLayout from "@/components/custome/table/TableLayout"
import TBody from "@/components/custome/table/TBody"
import Td from "@/components/custome/table/Td"
import Th from "@/components/custome/table/Th"
import THead from "@/components/custome/table/THead"
import TImage from "@/components/custome/table/TImage"
import ToolTip from "@/components/custome/table/ToolTip"
import Tr from "@/components/custome/table/Tr"
import { Button } from "@/components/ui/button"
import { ADMIN_ADD_ADMIN_URL, ADMIN_UPDATE_ADMIN_URL } from "@/constants/paths"
import useGlobalContext from "@/hooks/UseContext"
import { AxiosInstance } from "@/lib/axios.helper"
import type { CollectionMeta } from "@/models/collection.interface"
import { Edit2, RefreshCw, Search, Trash2, UserPlusIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useRoutes } from "react-router-dom"
import { toast } from "sonner"
import useLinker from "@/hooks/useLinker"
const AllAdmins = () => {
    const { loading, setLoading, auth } = useGlobalContext();

    const [meta, setMeta] = useState<CollectionMeta>({
        nmHits: 0,
        page: "admin/protected/admins?page=1",
        prev: null,
        next: null,
        links: {}
    });

    const [admins, setAdmins] = useState<Admin[]>([]);

    const [page, setPage] = useState(`admin/protected/admins?page=1`);

    useEffect(() => {
        const getAdmins = async () => {
            try {
                setLoading(true);

                const response = await AxiosInstance.get(page);

                setAdmins(response.data.items);
                setMeta(response.data.meta);

            } catch (err: any) {

                toast.error(err.response?.data.message || err.message);

            } finally {
                setLoading(false);
            }
        };

        getAdmins();
    }, [page]);

    const deleteAdmin = (id: number) => {
        console.log(id);
    };

    return (
        <div>
            <Breadcrumbs pages={{ "Site Admins List": "#" }} />
            <div className="my-4 overflow-x-auto">
                <div className="flex items-center justify-end pb-4 gap-3 w-full ">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                            {
                                loading ?
                                    <RefreshCw className="animate-spin" size={16} />
                                    :
                                    <Search size={16} />
                            }
                        </div>
                        <input
                            type="text"
                            id="table-search"
                            className="block p-2.5 ps-10 text-xs text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  focus:ring-0 focus:outline-none dark:text-white"
                            placeholder="Search name, username, email, role"
                        // ref={queryRef}
                        // onChange={handleSearch}
                        />

                    </div>

                    <Button className="p-3" asChild>
                        <Link to={ADMIN_ADD_ADMIN_URL} className="">Create New <UserPlusIcon /></Link>
                    </Button>
                </div>

                <TableLayout className="">
                    <THead>

                        <Th>Image</Th>
                        <Th>Email</Th>
                        <Th>Role</Th>
                        <Th>Action</Th>

                    </THead>
                    <TBody>

                        {
                            admins.map((admin: Admin, index: number) => {
                                return (
                                    <Tr key={index} >
                                        <TImage url={admin.image} fallback={admin.name} shape="size-16" />

                                        <Td>{admin.email}</Td>
                                        <Td>Super Admin</Td>
                                        <Td className="flex items-center">
                                            <ToolTip text="Edit Admin">
                                                <ActionLink link={useLinker(ADMIN_UPDATE_ADMIN_URL, { id: admin._id })} color="bg-green-200 me-5" >
                                                    <Edit2 />
                                                </ActionLink>
                                            </ToolTip>
                                            <ToolTip text="Delete Admin">
                                                <ActionButton callback={deleteAdmin} color="bg-red-200" >
                                                    <Trash2 />
                                                </ActionButton>
                                            </ToolTip>
                                        </Td>
                                    </Tr>
                                );
                            })
                        }
                    </TBody>
                </TableLayout>

                <Pagination callback={setPage} meta={meta} />
            </div>
        </div>
    )
}

export default AllAdmins


interface Admin {
    _id: string,
    name: string,
    email: string,
    image: string,
    verified: boolean
}