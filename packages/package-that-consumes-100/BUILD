load("@aspect_rules_ts//ts:defs.bzl", "ts_config", "ts_project")

ts_project(
    name = "library",
    visibility = ['//visibility:public'],
    tsconfig = ":tsconfig",
    srcs = glob(["src/**/*.ts"]),
    source_map = True,
    declaration = True,
    root_dir = "src",
    out_dir = "dist",
    # supports_workers = True
    validate = False,
    deps = ['//packages/package-1:library', '//packages/package-2:library', '//packages/package-3:library', '//packages/package-4:library', '//packages/package-5:library', '//packages/package-6:library', '//packages/package-7:library', '//packages/package-8:library', '//packages/package-9:library', '//packages/package-10:library', '//packages/package-11:library', '//packages/package-12:library', '//packages/package-13:library', '//packages/package-14:library', '//packages/package-15:library', '//packages/package-16:library', '//packages/package-17:library', '//packages/package-18:library', '//packages/package-19:library', '//packages/package-20:library', '//packages/package-21:library', '//packages/package-22:library', '//packages/package-23:library', '//packages/package-24:library', '//packages/package-25:library', '//packages/package-26:library', '//packages/package-27:library', '//packages/package-28:library', '//packages/package-29:library', '//packages/package-30:library', '//packages/package-31:library', '//packages/package-32:library', '//packages/package-33:library', '//packages/package-34:library', '//packages/package-35:library', '//packages/package-36:library', '//packages/package-37:library', '//packages/package-38:library', '//packages/package-39:library', '//packages/package-40:library', '//packages/package-41:library', '//packages/package-42:library', '//packages/package-43:library', '//packages/package-44:library', '//packages/package-45:library', '//packages/package-46:library', '//packages/package-47:library', '//packages/package-48:library', '//packages/package-49:library', '//packages/package-50:library', '//packages/package-51:library', '//packages/package-52:library', '//packages/package-53:library', '//packages/package-54:library', '//packages/package-55:library', '//packages/package-56:library', '//packages/package-57:library', '//packages/package-58:library', '//packages/package-59:library', '//packages/package-60:library', '//packages/package-61:library', '//packages/package-62:library', '//packages/package-63:library', '//packages/package-64:library', '//packages/package-65:library', '//packages/package-66:library', '//packages/package-67:library', '//packages/package-68:library', '//packages/package-69:library', '//packages/package-70:library', '//packages/package-71:library', '//packages/package-72:library', '//packages/package-73:library', '//packages/package-74:library', '//packages/package-75:library', '//packages/package-76:library', '//packages/package-77:library', '//packages/package-78:library', '//packages/package-79:library', '//packages/package-80:library', '//packages/package-81:library', '//packages/package-82:library', '//packages/package-83:library', '//packages/package-84:library', '//packages/package-85:library', '//packages/package-86:library', '//packages/package-87:library', '//packages/package-88:library', '//packages/package-89:library', '//packages/package-90:library', '//packages/package-91:library', '//packages/package-92:library', '//packages/package-93:library', '//packages/package-94:library', '//packages/package-95:library', '//packages/package-96:library', '//packages/package-97:library', '//packages/package-98:library', '//packages/package-99:library', '//packages/package-100:library']
)

ts_config(
    name = "tsconfig",
    src = "tsconfig.json",
    deps = [
        "//:tsconfig"
    ]
)