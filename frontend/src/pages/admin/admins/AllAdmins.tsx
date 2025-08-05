import Breadcrumbs from "@/components/custome/Breadcrumbs"
import TableLayout from "@/components/custome/table/TableLayout"
import TBody from "@/components/custome/table/TBody"
import Td from "@/components/custome/table/Td"
import Th from "@/components/custome/table/Th"
import THead from "@/components/custome/table/THead"
import Tr from "@/components/custome/table/Tr"
import { Button } from "@/components/ui/button"
import useGlobalContext from "@/hooks/UseContext"
import { RefreshCw, Search, UserPlusIcon } from "lucide-react"

const AllAdmins = () => {
    const { loading, setLoading, auth } = useGlobalContext();

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


                    <Button className="p-3">
                        Create New <UserPlusIcon />
                    </Button>
                </div>

                <TableLayout className="border">
                    <THead>

                        <Th>Image</Th>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Role</Th>
                        <Th>Action</Th>

                    </THead>
                    <TBody>
                        <Tr>
                            <Td>Ahsan</Td>
                            <Td>Ahsan</Td>
                            <Td>Ahsan</Td>
                            <Td>Ahsan</Td>
                            <Td>Ahsan</Td>
                        </Tr>
                       
                    </TBody>
                </TableLayout>

            </div>
        </div>
    )
}

export default AllAdmins