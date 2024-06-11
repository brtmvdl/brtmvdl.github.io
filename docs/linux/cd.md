## cd

Change Directory - change the current working directory to a specific Folder.

## Syntax 
      cd [Options] [Directory]

## Key
    -P    Do not follow symbolic links
    -L    Follow symbolic links (default)

If directory is given, changes the shell’s working directory to directory. If not, changes to HOME (shell variable).

```$ cd -``` will go back to the last folder you looked at. This does not stack, so issuing CD - repeatedly will just toggle between two directories, to go back further use pushd/popd. Previous directory - equivalent to $OLDPWD

./ or just . is shorthand for the current directory.

CDPATH
The shell variable CDPATH provides a useful feature, this variable is similar to PATH but it sets up a list of paths where cd will search for subdirectories. CDPATH can be set on the command line for use in the current session, or in .bash_profile for permanent use, the list of paths must be colon separated (:)

$ CDPATH=".:~:~/Library"

If dir begins with a slash (/), then CDPATH is not used.

If a non-empty directory name from CDPATH is used, or if - is the first argument, and the directory change is successful, the absolute pathname of the new working directory is written to the standard output.

The return status is zero if the directory is successfully changed, non-zero otherwise.

This is a BASH shell builtin, to display your local syntax from the bash prompt type: help cd

Examples
Move to the sybase folder:

$ cd /usr/local/sybase
$ pwd
/usr/local/sybase

Change to another folder:

$ cd /var/log
$ pwd
/var/log

Quickly get back:

$ cd -
$ pwd
/usr/local/sybase

Move up one folder:

$ cd ..
$ pwd
/usr/local/

Back to your home folder:

$ cd

Change to the directory fred inside the current directory:

$ cd ./fred

