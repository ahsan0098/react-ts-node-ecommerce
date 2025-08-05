const SellerLogin = () => {
  return (
      <div className="max-w-3xl mx-auto w-full py-10 px-4 space-y-8">

          <div className="flex items-center gap-2">
              <Avatar className="w-24 h-24 border">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>AA</AvatarFallback>
              </Avatar>
              <div className="w-full flex items-center justify-between">
                  <div>
                      <h2 className="text-2xl font-bold">{auth?.name}</h2>
                      <p className="ms-4 text-sm text-muted-foreground">{auth?.email}</p>
                  </div>
                  <div>
                      <Button variant="secondary" className="mt-2">Change Avatar</Button>
                  </div>
              </div>
          </div>


          <form className="space-y-6 text-start">
              <div className="grid md:grid-cols-2 gap-6">
                  <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Ahsan" />
                  </div>
                  <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Ali" />
                  </div>
              </div>

              <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" />
              </div>

              <div>
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                      id="bio"
                      className="w-full mt-1 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      rows={4}
                      placeholder="Write a few lines about yourself..."
                  />
              </div>

              <div className="flex justify-end">
                  <Button type="submit">Save Changes</Button>
              </div>
          </form>
      </div>
  )
}

export default SellerLogin