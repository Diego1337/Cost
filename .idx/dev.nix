
# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.python311
    pkgs.python311Packages.pip
    pkgs.nodejs_22
  ];

  # Sets environment variables in the workspace
  env = {};

  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      "ms-python.python"
      "dbaeumer.vscode-eslint"
    ];

    # Enable previews
    previews = {
      enable = true;
      previews = {
        # Frontend (React App)
        web = {
          command = ["npm" "run" "dev" "--" "--port" "$PORT"];
          manager = "web";
          cwd = "CostWise/front-end-main";
        };
        # Backend (Flask API)
        backend = {
          command = ["python" "app.py"];
          manager = "process";
          cwd = "CostWise/back-end-main";
        };
      };
    };

    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # Install backend dependencies
        pip-install = "pip install -r CostWise/back-end-main/requirements.txt";
        # Install frontend dependencies
        npm-install = "cd CostWise/front-end-main && npm install";
      };
      # Runs when the workspace is (re)started
      onStart = {
        # Open relevant files on start
        default.openFiles = [
          "CostWise/back-end-main/app.py"
          "CostWise/front-end-main/src/pages/Dashboard.jsx"
        ];
      };
    };
  };
}
